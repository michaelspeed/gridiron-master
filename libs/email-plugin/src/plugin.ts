import {
    createProxyHandler,
    EventBus,
    GridironPlugin,
    JobQueue, JobQueueService, Logger,
    OnGridironBootstrap,
    OnGridironClose,
    PluginCommonModule, RuntimeGridIronConfig, Type, WorkerService
} from "@gridiron/core";
import {EMAIL_PLUGIN_OPTIONS} from "./constants";
import {
    EmailPluginDevModeOptions,
    EmailPluginOptions, EmailWorkerMessage,
    EventWithAsyncData,
    EventWithContext,
    IntermediateEmailDetails
} from "./types";
import {DevMailbox} from "./dev-mailbox";
import {EmailProcessor} from "./email-processor";
import {InjectConnection} from "@nestjs/typeorm";
import { Connection } from "typeorm";
import {ModuleRef} from "@nestjs/core";
import {EmailProcessorController} from "./email-processor.controller";
import {isDevModeOptions} from "./common";
import {EmailEventHandler, EmailEventHandlerWithAsyncData} from "./email-handler";

@GridironPlugin({
    imports: [PluginCommonModule],
    providers: [{provide: EMAIL_PLUGIN_OPTIONS, useFactory: () => EmailPlugin.options}],
    workers: [EmailProcessorController],
    configuration: config => EmailPlugin.configure(config)
})
export class EmailPlugin implements OnGridironBootstrap, OnGridironClose {

    private static options: EmailPluginOptions | EmailPluginDevModeOptions
    private devMailbox: DevMailbox | undefined
    private jobQueue: JobQueue<IntermediateEmailDetails> | undefined
    private testingProcessor: EmailProcessor | undefined;

    constructor(
       private eventBus: EventBus,
       @InjectConnection() private connection: Connection,
       private moduleRef: ModuleRef,
       private workerService: WorkerService,
       private jobQueueService: JobQueueService,
    ) {}

    static init(options: EmailPluginOptions | EmailPluginDevModeOptions): Type<EmailPlugin> {
        this.options = options
        return EmailPlugin
    }

    static configure(config: RuntimeGridIronConfig): RuntimeGridIronConfig {
        Logger.info('[Email Plugin] Initializing')
        if (isDevModeOptions(this.options) && this.options.mailboxPort !== undefined) {
            const route = 'mailbox'
            config.apiOptions.middleware.push({
                handler: createProxyHandler({port: this.options.mailboxPort, route, label: 'Dev mailbox'}),
                route
            });
        }
        return config
    }


    async onGridironBootstrap(): Promise<void> {
        const options = EmailPlugin.options

        if (isDevModeOptions(options) && options.mailboxPort !== undefined) {
            this.devMailbox = new DevMailbox()
            this.devMailbox.serve(options)
            this.devMailbox.handleMockEvent((handler, event) => this.handleEvent(handler, event))
        }

        await this.setupEventSubscribers()

        if (!isDevModeOptions(options) && options.transport.type === "testing") {
            this.testingProcessor = new EmailProcessor(options)
            await this.testingProcessor.init()
        } else {
            this.jobQueue = this.jobQueueService.createQueue({
                name: 'send-email',
                concurrency: 5,
                process: job => {
                    this.workerService.send(new EmailWorkerMessage(job.data)).subscribe({
                        complete: () => job.complete(),
                        error: err => job.fail(err)
                    })
                }
            })
        }
    }

    async onGridironClose() {
        if (this.devMailbox) {
            this.devMailbox.destroy()
        }
    }

    private async setupEventSubscribers() {
        for (const handler of EmailPlugin.options.handlers) {
            this.eventBus.ofType(handler.event).subscribe(event => {
                return this.handleEvent(handler, event);
            });
        }
    }

    private async handleEvent(
        handler: EmailEventHandler | EmailEventHandlerWithAsyncData<any>,
        event: EventWithContext,
    ) {
        Logger.debug(`Handling event "${handler.type}"`, 'EmailPlugin');
        const { type } = handler;
        try {
            if (handler instanceof EmailEventHandlerWithAsyncData) {
                (event as EventWithAsyncData<EventWithContext, any>).data = await handler._loadDataFn({
                    event,
                    connection: this.connection,
                    inject: t => this.moduleRef.get(t, { strict: false }),
                });
            }
            const result = await handler.handle(event as any, EmailPlugin.options.globalTemplateVars);
            if (!result) {
                return;
            }
            if (this.jobQueue) {
                await this.jobQueue.add(result);
            } else if (this.testingProcessor) {
                await this.testingProcessor.process(result);
            }
        } catch (e) {
            Logger.error(e.message, 'EmailPlugin', e.stack);
        }
    }
}
