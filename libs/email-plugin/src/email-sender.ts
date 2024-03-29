import {EmailDetails, EmailTransportOptions, SendmailTransportOptions, SMTPTransportOptions} from "./types";
import { default as Mail } from 'nodemailer/lib/mailer';
import {Stream} from "stream";
import {assertNever, normalizeString} from "@gridiron/core";
import path from "path";
import { createTransport } from 'nodemailer';
import fs from "fs-extra";

export type StreamTransportInfo = {
    envelope: {
        from: string;
        to: string[];
    };
    messageId: string;
    message: Stream;
};

/**
 * Uses the configured transport to send the generated email.
 */
export class EmailSender {
    private _smtpTransport: Mail | undefined;
    private _sendMailTransport: Mail | undefined;

    async send(email: EmailDetails, options: EmailTransportOptions) {
        switch (options.type) {
            case 'none':
                return;
                break;
            case 'file':
                const fileName = normalizeString(
                    `${new Date().toISOString()} ${email.recipient} ${email.subject}`,
                    '_',
                );
                const filePath = path.join(options.outputPath, fileName);
                if (options.raw) {
                    await this.sendFileRaw(email, filePath);
                } else {
                    await this.sendFileJson(email, filePath);
                }
                break;
            case 'sendmail':
                await this.sendMail(email, this.getSendMailTransport(options));
                break;
            case 'smtp':
                await this.sendMail(email, this.getSmtpTransport(options));
                break;
            case 'testing':
                options.onSend(email);
                break;
            default:
                return assertNever(options);
        }
    }

    private getSmtpTransport(options: SMTPTransportOptions) {
        if (!this._smtpTransport) {
            this._smtpTransport = createTransport(options);
        }
        return this._smtpTransport;
    }

    private getSendMailTransport(options: SendmailTransportOptions) {
        if (!this._sendMailTransport) {
            this._sendMailTransport = createTransport({ sendmail: true, ...options });
        }
        return this._sendMailTransport;
    }

    private async sendMail(email: EmailDetails, transporter: Mail): Promise<any> {
        return transporter.sendMail({
            from: email.from,
            to: email.recipient,
            subject: email.subject,
            html: email.body,
        });
    }

    private async sendFileJson(email: EmailDetails, pathWithoutExt: string) {
        const output = {
            date: new Date().toLocaleString(),
            from: email.from,
            recipient: email.recipient,
            subject: email.subject,
            body: email.body,
        };
        await fs.writeFile(pathWithoutExt + '.json', JSON.stringify(output, null, 2));
    }

    private async sendFileRaw(email: EmailDetails, pathWithoutExt: string) {
        const transporter = createTransport({
            streamTransport: true,
            buffer: true,
        });
        const result = await this.sendMail(email, transporter);
        await this.writeStreamToFile(pathWithoutExt + '.txt', result);
    }

    private async writeStreamToFile(filePath: string, info: StreamTransportInfo): Promise<string> {
        const writeStream = fs.createWriteStream(filePath);
        return new Promise<string>((resolve, reject) => {
            writeStream.on('open', () => {
                info.message.pipe(writeStream);
                writeStream.on('close', resolve);
                writeStream.on('error', reject);
            });
        });
    }
}
