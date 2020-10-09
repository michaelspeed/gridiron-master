import {TemplateLoader} from "./template-loader";
import {EmailSender} from "./email-sender";
import {EmailPluginOptions, EmailTransportOptions, IntermediateEmailDetails} from "./types";
import {HandlebarsMjmlGenerator} from "./handlebars-mjml-generator";
import {isDevModeOptions} from "./common";
import {InternalServerError} from "@gridiron/core";
import fs from "fs-extra";

export class EmailProcessor {
    protected templateLoader: TemplateLoader;
    protected emailSender: EmailSender;
    protected generator: HandlebarsMjmlGenerator;
    protected transport: EmailTransportOptions;

    constructor(protected options: EmailPluginOptions) {}

    async init() {
        this.templateLoader = new TemplateLoader(this.options.templatePath);
        this.emailSender = new EmailSender();
        this.generator = new HandlebarsMjmlGenerator();
        if (this.generator.onInit) {
            await this.generator.onInit.call(this.generator, this.options);
        }
        if (isDevModeOptions(this.options)) {
            this.transport = {
                type: 'file',
                raw: false,
                outputPath: this.options.outputPath,
            };
        } else {
            if (!this.options.transport) {
                throw new InternalServerError(
                    `When devMode is not set to true, the 'transport' property must be set.`,
                );
            }
            this.transport = this.options.transport;
        }
        if (this.transport.type === 'file') {
            // ensure the configured directory exists before
            // we attempt to write files to it
            const emailPath = this.transport.outputPath;
            await fs.ensureDir(emailPath);
        }
    }

    async process(data: IntermediateEmailDetails) {
        const bodySource = await this.templateLoader.loadTemplate(data.type, data.templateFile);
        const generated = await this.generator.generate(
            data.from,
            data.subject,
            bodySource,
            data.templateVars,
        );
        const emailDetails = { ...generated, recipient: data.recipient };
        await this.emailSender.send(emailDetails, this.transport);
        return true;
    }
}
