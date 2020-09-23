import { EmailProcessor } from "./email-processor";
import {Controller, Inject, OnModuleInit} from "@nestjs/common";
import {EMAIL_PLUGIN_OPTIONS} from "./constants";
import {EmailPluginOptions, EmailWorkerMessage} from "./types";
import {MessagePattern} from "@nestjs/microservices";
import {Observable} from "rxjs";
import {asyncObservable} from "@gridiron/core";

@Controller()
export class EmailProcessorController extends EmailProcessor implements OnModuleInit {
    constructor(@Inject(EMAIL_PLUGIN_OPTIONS) protected options: EmailPluginOptions) {
        super(options);
    }

    async onModuleInit() {
        await super.init();
    }

    @MessagePattern(EmailWorkerMessage.pattern)
    sendEmail(data: EmailWorkerMessage['data']): Observable<EmailWorkerMessage['response']> {
        return asyncObservable(async () => {
            return this.process(data);
        });
    }
}
