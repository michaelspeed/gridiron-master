import {Transport} from '@nestjs/microservices';
import {DefaultLogger, GridIronConfig, InMemoryJobQueueStrategy, RestPlugin} from '@gridiron/core';
import * as dotenv from 'dotenv';

const {parsed} = dotenv.config()

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
