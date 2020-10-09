import * as http from "http";
import {EmailEventHandler} from "./email-handler";
import {EmailPluginDevModeOptions, EventWithContext} from "./types";
import express from 'express';
import path from "path";
import fs from "fs-extra";
import {RequestContext} from "@nestjs/microservices";

export class DevMailbox {
    server: http.Server;
    private handleMockEventFn: (
        handler: EmailEventHandler<string, any>,
        event: EventWithContext,
    ) => void | undefined;

    serve(options: EmailPluginDevModeOptions) {
        const { outputPath, handlers, mailboxPort } = options;
        const server = express();
        server.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../dev-mailbox.html'));
        });
        server.get('/list', async (req, res) => {
            const list = await fs.readdir(outputPath);
            const contents = await this.getEmailList(outputPath);
            res.send(contents);
        });
        server.get('/types', async (req, res) => {
            res.send(handlers.map(h => h.type));
        });
        server.get('/generate/:type/:languageCode', async (req, res) => {
            const { type, languageCode } = req.params;
            if (this.handleMockEventFn) {
                const handler = handlers.find(h => h.type === type);
                if (!handler || !handler.mockEvent) {
                    res.statusCode = 404;
                    res.send({ success: false, error: `No mock event registered for type "${type}"` });
                    return;
                }
                try {
                    await this.handleMockEventFn(handler, {
                        ...handler.mockEvent
                    });
                    res.send({ success: true });
                } catch (e) {
                    res.statusCode = 500;
                    res.send({ success: false, error: e.message });
                }
                return;
            } else {
                res.send({ success: false, error: `Mock email generation not set up.` });
            }
        });
        server.get('/item/:id', async (req, res) => {
            const fileName = req.params.id;
            const content = await this.getEmail(outputPath, fileName);
            res.send(content);
        });
        this.server = server.listen(mailboxPort);
    }

    handleMockEvent(handler: (handler: EmailEventHandler<string, any>, event: EventWithContext) => void) {
        this.handleMockEventFn = handler;
    }

    destroy() {
        this.server.close();
    }

    private async getEmailList(outputPath: string) {
        const list = await fs.readdir(outputPath);
        const contents: any[] = [];
        for (const fileName of list) {
            const json = await fs.readFile(path.join(outputPath, fileName), 'utf-8');
            const content = JSON.parse(json);
            contents.push({
                fileName,
                date: content.date,
                subject: content.subject,
                recipient: content.recipient,
            });
        }
        contents.sort((a, b) => {
            return +new Date(b.date) - +new Date(a.date);
        });
        return contents;
    }

    private async getEmail(outputPath: string, fileName: string) {
        const safeSuffix = path.normalize(fileName).replace(/^(\.\.(\/|\\|$))+/, '');
        const safeFilePath = path.join(outputPath, safeSuffix);
        const json = await fs.readFile(safeFilePath, 'utf-8');
        const content = JSON.parse(json);
        return content;
    }
}
