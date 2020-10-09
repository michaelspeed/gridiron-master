import {GridIronEvents, Omit, Type, WorkerMessage} from "@gridiron/core";
import {Connection} from "typeorm";
import {EmailEventHandler} from "./email-handler";

export type EventWithContext = GridIronEvents;


export type EventWithAsyncData<Event extends EventWithContext, R> = Event & { data: R };

export interface EmailPluginOptions {

    templatePath: string;

    transport: EmailTransportOptions;

    handlers: EmailEventHandler[];

    globalTemplateVars?: { [key: string]: any };
}


export interface EmailPluginDevModeOptions extends Omit<EmailPluginOptions, 'transport'> {
    devMode: true;

    outputPath: string;

    mailboxPort?: number;
}

export interface SMTPCredentials {

    user: string;

    pass: string;
}

export type EmailTransportOptions =
    | SMTPTransportOptions
    | SendmailTransportOptions
    | FileTransportOptions
    | NoopTransportOptions
    | TestingTransportOptions;


export interface SMTPTransportOptions {
    type: 'smtp';

    host: string;

    port: number;

    auth: SMTPCredentials;

    secure?: boolean;

    ignoreTLS?: boolean;

    requireTLS?: boolean;

    name?: string;

    localAddress?: string;

    authMethod?: string;
}

export interface SendmailTransportOptions {
    type: 'sendmail';

    path?: string;

    newline?: string;
}

export interface FileTransportOptions {
    type: 'file';

    outputPath: string;

    raw?: boolean;
}

export interface NoopTransportOptions {
    type: 'none';
}

export interface EmailDetails {
    from: string;
    recipient: string;
    subject: string;
    body: string;
}

export interface TestingTransportOptions {
    type: 'testing';

    onSend: (details: EmailDetails) => void;
}

export interface EmailGenerator<T extends string = any, E extends GridIronEvents = any> {

    onInit?(options: EmailPluginOptions): void | Promise<void>;

    generate(
        from: string,
        subject: string,
        body: string,
        templateVars: { [key: string]: any },
    ): Omit<EmailDetails, 'recipient'>;
}

export type LoadDataFn<Event extends EventWithContext, R> = (context: {
    event: Event;
    connection: Connection;
    inject: <T>(type: Type<T>) => T;
}) => Promise<R>;

export type IntermediateEmailDetails = {
    type: string;
    from: string;
    recipient: string;
    templateVars: any;
    subject: string;
    templateFile: string;
};

export class EmailWorkerMessage extends WorkerMessage<IntermediateEmailDetails, boolean> {
    static readonly pattern = 'send-email';
}
