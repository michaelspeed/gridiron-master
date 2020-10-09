import {EmailGenerator} from "./types";

export class NoopEmailGenerator implements EmailGenerator {
    generate(from: string, subject: string, body: string, templateVars: any) {
        return { from, subject, body };
    }
}
