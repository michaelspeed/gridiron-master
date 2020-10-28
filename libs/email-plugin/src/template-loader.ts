import path from "path";
import fs from "fs-extra";

export class TemplateLoader {
    constructor(private templatePath: string) {}

    async loadTemplate(
        type: string,
        templateFileName: string,
    ): Promise<string> {
        // TODO: logic to select other files based on channel / language
        const templatePath = path.join(this.templatePath, type, templateFileName);
        fs.ensureDirSync(templatePath)
        const body = await fs.readFile(templatePath, 'utf-8');
        return body;
    }
}
