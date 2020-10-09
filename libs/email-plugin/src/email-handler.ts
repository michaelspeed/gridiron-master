import {EventWithAsyncData, EventWithContext, IntermediateEmailDetails, LoadDataFn} from "./types";
import {EmailEventListener, EmailTemplateConfig, SetTemplateVarsFn} from "./email-listners";
import {Type} from "@gridiron/core";

export class EmailEventHandler<T extends string = string, Event extends EventWithContext = EventWithContext> {
    private setRecipientFn: (event: Event) => string;
    private setTemplateVarsFn: SetTemplateVarsFn<Event>;
    private filterFns: Array<(event: Event) => boolean> = [];
    private configurations: EmailTemplateConfig[] = [];
    private defaultSubject: string;
    private from: string;
    private _mockEvent: Omit<Event, 'ctx'> | undefined;

    constructor(public listener: EmailEventListener<T>, public event: Type<Event>) {}

    get type(): T {
        return this.listener.type;
    }

    get mockEvent(): Omit<Event, 'ctx'> | undefined {
        return this._mockEvent;
    }

    filter(filterFn: (event: Event) => boolean): EmailEventHandler<T, Event> {
        this.filterFns.push(filterFn);
        return this;
    }


    setRecipient(setRecipientFn: (event: Event) => string): EmailEventHandler<T, Event> {
        this.setRecipientFn = setRecipientFn;
        return this;
    }

    setTemplateVars(templateVarsFn: SetTemplateVarsFn<Event>): EmailEventHandler<T, Event> {
        this.setTemplateVarsFn = templateVarsFn;
        return this;
    }

    setSubject(defaultSubject: string): EmailEventHandler<T, Event> {
        this.defaultSubject = defaultSubject;
        return this;
    }

    setFrom(from: string): EmailEventHandler<T, Event> {
        this.from = from;
        return this;
    }

    addTemplate(config: EmailTemplateConfig): EmailEventHandler<T, Event> {
        this.configurations.push(config);
        return this;
    }

    /**
     * @description
     * Allows data to be loaded asynchronously which can then be used as template variables.
     * The `loadDataFn` has access to the event, the TypeORM `Connection` object, and an
     * `inject()` function which can be used to inject any of the providers exported
     * by the {@link PluginCommonModule}. The return value of the `loadDataFn` will be
     * added to the `event` as the `data` property.
     *
     * @example
     * ```TypeScript
     * new EmailEventListener('order-confirmation')
     *   .on(OrderStateTransitionEvent)
     *   .filter(event => event.toState === 'PaymentSettled' && !!event.order.customer)
     *   .loadData(({ event, inject}) => {
     *     const orderService = inject(OrderService);
     *     return orderService.getOrderPayments(event.order.id);
     *   })
     *   .setTemplateVars(event => ({
     *     order: event.order,
     *     payments: event.data,
     *   }));
     * ```
     */
    loadData<R>(
        loadDataFn: LoadDataFn<Event, R>,
    ): EmailEventHandlerWithAsyncData<R, T, Event, EventWithAsyncData<Event, R>> {
        const asyncHandler = new EmailEventHandlerWithAsyncData(loadDataFn, this.listener, this.event);
        asyncHandler.setRecipientFn = this.setRecipientFn;
        asyncHandler.setTemplateVarsFn = this.setTemplateVarsFn;
        asyncHandler.filterFns = this.filterFns;
        asyncHandler.configurations = this.configurations;
        asyncHandler.defaultSubject = this.defaultSubject;
        asyncHandler.from = this.from;
        asyncHandler._mockEvent = this._mockEvent as any;
        return asyncHandler;
    }


    async handle(
        event: Event,
        globals: { [key: string]: any } = {},
    ): Promise<IntermediateEmailDetails | undefined> {
        for (const filterFn of this.filterFns) {
            if (!filterFn(event)) {
                return;
            }
        }
        if (!this.setRecipientFn) {
            throw new Error(
                `No setRecipientFn has been defined. ` +
                `Remember to call ".setRecipient()" when setting up the EmailEventHandler for ${this.type}`,
            );
        }
        if (this.from === undefined) {
            throw new Error(
                `No from field has been defined. ` +
                `Remember to call ".setFrom()" when setting up the EmailEventHandler for ${this.type}`,
            );
        }
        const configuration = this.getBestConfiguration();
        const subject = configuration ? configuration.subject : this.defaultSubject;
        if (subject == null) {
            throw new Error(
                `No subject field has been defined. ` +
                `Remember to call ".setSubject()" when setting up the EmailEventHandler for ${this.type}`,
            );
        }
        const recipient = this.setRecipientFn(event);
        const templateVars = this.setTemplateVarsFn ? this.setTemplateVarsFn(event, globals) : {};
        return {
            type: this.type,
            recipient,
            from: this.from,
            templateVars: { ...globals, ...templateVars },
            subject,
            templateFile: configuration ? configuration.templateFile : 'body.hbs',
        };
    }


    setMockEvent(event: Omit<Event, 'ctx'>): EmailEventHandler<T, Event> {
        this._mockEvent = event;
        return this;
    }

    private getBestConfiguration(): EmailTemplateConfig | undefined {
        if (this.configurations.length === 0) {
            return;
        }
        const exactMatch = this.configurations[0]
        if (exactMatch) {
            return exactMatch;
        }
        return;
    }
}


export class EmailEventHandlerWithAsyncData<
    Data,
    T extends string = string,
    InputEvent extends EventWithContext = EventWithContext,
    Event extends EventWithAsyncData<InputEvent, Data> = EventWithAsyncData<InputEvent, Data>
    > extends EmailEventHandler<T, Event> {
    constructor(
        public _loadDataFn: LoadDataFn<InputEvent, Data>,
        listener: EmailEventListener<T>,
        event: Type<InputEvent>,
    ) {
        super(listener, event as any);
    }
}
