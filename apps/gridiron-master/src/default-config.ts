import {Transport} from '@nestjs/microservices';
import * as path from 'path';
import {
    DefaultAssetsNamingStrategy,
    DefaultLogger,
    GridIronConfig,
    InMemoryJobQueueStrategy, NoopLogger,
    RestPlugin
} from '@gridiron/core';
import {AssetsServerPlugin, configureGoogleCloudStorage, configureS3AssetStorage} from '@gridiron/asset-server-plugin';
import {defaultEmailHandlers, EmailPlugin} from "@gridiron/email-plugin";


// anibo config
export const DEF_CONFIG: GridIronConfig = {
    logger: new DefaultLogger(),
    apiOptions: {
        hostname: '',
        port: 6898,
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
            port: 6002,
            namingStrategy: new DefaultAssetsNamingStrategy()
        }),
        /*EmailPlugin.init({
            devMode: true,
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, 'templates'),
            outputPath: path.join(__dirname, 'test-emails'),
            mailboxPort: 6003,
            globalTemplateVars: {
                verifyEmailAddressUrl: 'http://localhost:4201/verify',
                passwordResetUrl: 'http://localhost:4201/reset-password',
            },
        })*/
    ],
    workerOptions: {
        runInMainProcess: false,
        transport: Transport.TCP,
        options: {
            port: 3021
        }
    },
    authOptions: {
        authTokenHeaderKey: 'gridiron-key'
    },
    dbConnectionOptions: {
        database: 'oihelp',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'mike0001',
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
