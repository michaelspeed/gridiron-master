import {Transport} from '@nestjs/microservices';
import * as path from 'path';
import {
    DefaultAssetsNamingStrategy,
    DefaultLogger,
    GridIronConfig,
    InMemoryJobQueueStrategy,
    RestPlugin
} from '@gridiron/core';
import {AssetsServerPlugin, configureGoogleCloudStorage, configureS3AssetStorage} from '@gridiron/asset-server-plugin';
import {defaultEmailHandlers, EmailPlugin} from "@gridiron/email-plugin";


// anibo config
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
            port: 5002,
            namingStrategy: new DefaultAssetsNamingStrategy()
        }),
        /*EmailPlugin.init({
            devMode: true,
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, 'templates'),
            outputPath: path.join(__dirname, 'test-emails'),
            mailboxPort: 5003,
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
            port: 3020
        }
    },
    authOptions: {
        authTokenHeaderKey: 'gridiron-key'
    },
    dbConnectionOptions: {
        database: 'assammart',
        type: 'mysql',
        host: 'ls-cac559240bd8e22d83894da3b6ee0768e4d43bc1.cxkzwswlsfxz.ap-south-1.rds.amazonaws.com',
        port: 3306,
        username: 'root',
        password: '%gqg28yBNf73RPjTHX$yij3G$J1vcn?a',
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
