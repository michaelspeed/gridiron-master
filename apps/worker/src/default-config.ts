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
