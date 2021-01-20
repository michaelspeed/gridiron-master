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
        adminApiPath: process.env.admin_api,
        shopApiPath: process.env.shop_api,
        cors: Boolean(process.env.cors),
        middleware: [],
        apolloServerPlugin: []
    },
    plugins: [

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
        database: process.env.db,
        type: 'mysql',
        host: process.env.host,
        port: 3306,
        username: process.env.username,
        password: process.env.password,
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
