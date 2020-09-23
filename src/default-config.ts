import {Transport} from '@nestjs/microservices';
import * as path from 'path';
import {DefaultLogger, GridIronConfig, InMemoryJobQueueStrategy, RestPlugin} from '@gridiron/core';
import {AssetsServerPlugin} from '@gridiron/asset-server-plugin';
import {defaultEmailHandlers, EmailPlugin} from "@gridiron/email-plugin";

export const DEF_CONFIG: GridIronConfig = {
    logger: new DefaultLogger(),
    apiOptions: {
        hostname: '',
        port: 5588,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        cors: true,
        middleware: [],
        apolloServerPlugin: []
    },
    plugins: [
        AssetsServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, 'assets'),
            port: 5002
        }),
        EmailPlugin.init({
            devMode: true,
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../libs/email-plugin/templates'),
            outputPath: path.join(__dirname, 'test-emails'),
            mailboxPort: 5003,
            globalTemplateVars: {
                verifyEmailAddressUrl: 'http://localhost:4201/verify',
                passwordResetUrl: 'http://localhost:4201/reset-password',
            },
        })
    ],
    workerOptions: {
        runInMainProcess: false,
        transport: Transport.TCP,
        options: {
            port: 3020
        }
    },
    authOptions: {
        authTokenHeaderKey: 'gridiron-key'
    },
    dbConnectionOptions: {
        database: 'gridiron',
        type: 'mysql',
        host: '45.118.132.119',
        port: 3306,
        username: 'oncall',
        password: 'oncall0609',
        connectTimeout: 1000000,
        synchronize: true,
        /*logger: "advanced-console",
        logging: "all"*/
    },
    jobQueueOptions: {
        jobQueueStrategy: new InMemoryJobQueueStrategy(),
        pollInterval: 200,
    },
    defaultTax: 10,
    flatFeeAmount: 2
}
