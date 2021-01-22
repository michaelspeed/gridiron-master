import {Transport} from '@nestjs/microservices';
import * as path from 'path';
import {
    DefaultAssetsNamingStrategy,
    DefaultLogger,
    GridIronConfig,
    InMemoryJobQueueStrategy
} from '@gridiron/core';
import {AssetsServerPlugin, configureGoogleCloudStorage, configureS3AssetStorage} from '@gridiron/asset-server-plugin';
import * as dotenv from 'dotenv';

const {parsed} = dotenv.config();

export const DEF_CONFIG: GridIronConfig = {
    logger: new DefaultLogger(),
    apiOptions: {
        hostname: '',
        port: 5588,
        adminApiPath: parsed.admin_api,
        shopApiPath: parsed.shop_api,
        cors: Boolean(parsed.cors),
        middleware: [],
        apolloServerPlugin: []
    },
    plugins: [
        AssetsServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, 'assets'),
            port: 5002,
            namingStrategy: new DefaultAssetsNamingStrategy(),
            storageStrategyFactory: configureS3AssetStorage({
                bucket: parsed.bucket,
                credentials: {
                    accessKeyId: parsed.accessKeyId,
                    secretAccessKey: parsed.secretAccessKey
                }
            })
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
        authTokenHeaderKey: process.env.authTokenHeaderKey
    },
    dbConnectionOptions: {
        database: parsed.db,
        type: 'mysql',
        host: parsed.host,
        port: 3306,
        username: parsed.username,
        password: parsed.password,
        connectTimeout: 1000000,
        synchronize: false,
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
