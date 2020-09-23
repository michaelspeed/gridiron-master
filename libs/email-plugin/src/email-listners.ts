import {EventWithContext} from "./types";
import {Type} from "@gridiron/core";
import {EmailEventHandler} from "./email-handler";


export interface EmailTemplateConfig {

    templateFile: string;

    subject: string;
}


export type SetTemplateVarsFn<Event> = (
    event: Event,
    globals: { [key: string]: any },
) => { [key: string]: any };


export class EmailEventListener<T extends string> {
    public type: T;
    constructor(type: T) {
        this.type = type;
    }

    on<Event extends EventWithContext>(event: Type<Event>): EmailEventHandler<T, Event> {
        return new EmailEventHandler<T, Event>(this, event);
    }
}
