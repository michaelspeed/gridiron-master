import chalk from 'chalk';
import {GridIronLogger, Logger, LogLevel} from './GridIronLogger';

const DEFAULT_CONTEXT = 'GridIron Server'

export class DefaultLogger implements GridIronLogger {

    level: LogLevel = LogLevel.Info;
    private readonly timestamp: boolean;
    private defaultContext = DEFAULT_CONTEXT;
    private readonly localeStringOptions = {
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
    };
    private static originalLogLevel: LogLevel;

    constructor(options?: { level?: LogLevel; timestamp?: boolean }) {
        this.level = options && options.level != null ? options.level : LogLevel.Info;
        this.timestamp = options && options.timestamp !== undefined ? options.timestamp : true;
    }

    static hideNestBoostrapLogs(): void {
        const { logger } = Logger;
        if (logger instanceof DefaultLogger) {
            if (logger.level === LogLevel.Info) {
                this.originalLogLevel = LogLevel.Info;
                logger.level = LogLevel.Warn;
            }
        }
    }

    static restoreOriginalLogLevel(): void {
        const { logger } = Logger;
        if (logger instanceof DefaultLogger && DefaultLogger.originalLogLevel !== undefined) {
            logger.level = DefaultLogger.originalLogLevel;
        }
    }

    setDefaultContext(defaultContext: string) {
        this.defaultContext = defaultContext;
    }

    error(message: string, context?: string, trace?: string | undefined): void {
        if (context === 'ExceptionsHandler' && this.level < LogLevel.Verbose) {
            // In Nest v7, there is an ExternalExceptionFilter which catches *all*
            // errors and logs them, no matter the LogLevel attached to the error.
            // This results in overly-noisy logger output (e.g. a failed login attempt
            // will log a full stack trace). This check means we only let it log if
            // we are in Verbose or Debug mode.
            return;
        }
        if (this.level >= LogLevel.Error) {
            this.logMessage(
                chalk.red(`error`),
                chalk.red(this.ensureString(message) + (trace ? `\n${trace}` : '')),
                context,
            );
        }
    }
    warn(message: string, context?: string): void {
        if (this.level >= LogLevel.Warn) {
            this.logMessage(chalk.yellow(`warn`), chalk.yellow(this.ensureString(message)), context);
        }
    }
    info(message: string, context?: string): void {
        if (this.level >= LogLevel.Info) {
            this.logMessage(chalk.blue(`info`), this.ensureString(message), context);
        }
    }
    verbose(message: string, context?: string): void {
        if (this.level >= LogLevel.Verbose) {
            this.logMessage(chalk.magenta(`verbose`), this.ensureString(message), context);
        }
    }
    debug(message: string, context?: string): void {
        if (this.level >= LogLevel.Debug) {
            this.logMessage(chalk.magenta(`debug`), this.ensureString(message), context);
        }
    }

    private logMessage(prefix: string, message: string, context?: string) {
        process.stdout.write(
            [prefix, this.logTimestamp(), this.logContext(context), message, '\n'].join(' '),
        );
    }

    private logContext(context?: string) {
        return chalk.cyan(`[${context || this.defaultContext}]`);
    }

    private logTimestamp() {
        if (this.timestamp) {
            const timestamp = new Date(Date.now()).toLocaleString(undefined, this.localeStringOptions);
            return chalk.gray(timestamp + ' -');
        } else {
            return '';
        }
    }

    private ensureString(message: string | object | any[]): string {
        return typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    }

}
