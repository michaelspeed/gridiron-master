import {Transport} from '@nestjs/microservices';
import * as path from 'path';
import {DefaultLogger, GridIronConfig, InMemoryJobQueueStrategy, RestPlugin} from '@gridiron/core';
import {AssetsServerPlugin, configureGoogleCloudStorage} from '@gridiron/asset-server-plugin';
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
            port: 5002,
            /*storageStrategyFactory: configureGoogleCloudStorage({
                credentials: {
                    credentials: {
                        "type": "service_account",
                        "project_id": "assam-mart",
                        "private_key_id": "8da15ef9ff8d97759e3c8ac842c19c8d0bcea00c",
                        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6YtJqoKK8yHel\n1PZn805zPerwymbBWejV+Fug5AYiLP9dHe7fnOnqvGvR9DRsoyTMizT1UQbqLDug\n7y/wipxE4xWVl0W98WFMs+r6lqYv650GMbgFCbmKOl2oCEBFBDTfLBWudYe00Qyo\nL8hjXge2Kf3QY6NDQWbRF0M8f0Dez6gP9ETi+CCV27YLrhwwLGZ94GCHxv0hF4nV\naVqofnPk23Z/JRriVeFn6FjD1yTPqFhjE23HyMw12HAGijcWBPQe/VsgvR+n0OSZ\nIrJYNEpBYWeBVgwNDhC9tvzyCCBEJ1tEDhXbe7eQne7OwmelPNsmAXliw3wW+qDT\nYY6xymJTAgMBAAECggEAAZKd5epvFRq3771JSv1BlzVZiyiaD12b2lpbI5No/dbV\nXMrI3jgrvSBT5JSj8Jq7z8II81z4qvculaAPDn+M7APihb2eCAlGYehOvkiRJGxf\nidLXk6tOVn1Blw5ixHJRo+RyVmOFfqAY9D5a+YOsmvvluWFt2j5uCKuilJsaSAcC\n0mmtdONMtUJ+eZAW9qRmnRg1kHYaXacu/79W357xjX0bUQ385UGpWlQ5WZA36hsb\njjZTYwzGLn6JO838iFAHmP4gr8BaC0pmxcVrOxCrv5LvDtBp8i8JWQWYMF4sYOXv\nPZAGxM/tPPdP+1wt32paigOk7Q/sLyemPFp5w9oH+QKBgQD6kUVgQkrbL8LxJNv4\nS4/AM1thCdAPgdg9XuQ16pGg9//pUGRK2YZOfUtwEE53q1ZTySrxXgoVEtQrkXom\nJ0hi9oPf3PjB4ShbRIAa7s1Aty9LEQN9KNfXoGHYEU66sGh9B4O+GnbE+sGAtzPn\nJVut/3hRpHmPtFtrOxIX2ZjIpwKBgQC+bVLUoFOmWuSUuwtMwUK5CredgOVqudfD\nd8CS8AGTTcR+wdLj08dsCOYzVNVNKlQGxI15ditliXRsHIqWHih4nMwIDR+oeSSS\ngmBkQ/NkKSCwsWCOnWRFH6yKRt0o5ncMwyEauNPakA0PzlbXt8oNCb/O/ytBh0U4\nXwpu0ruidQKBgBwd1QUaK0AxOdTJaA2SnQzaNnTLHxe+YD9yuHT8X18KtSK/LKHh\nitqf4Kkwiz2Ocl9wgWsYPFVlCX3iEyzY15yTQPUL3LYUx+yF4UIkbc/HPn1T6WpP\n/PhrPM98EbONPAxbnYLlgVJVOQVyiVZ0sLbzpdKzfBiOCnwb4sneVvCdAoGAFRqK\nhnPqMVJ7aJw+CViVq2orpTHmuugzqD76QY6Frix9LUsPsx4CSM/Hq0KojO+29jUM\nNLzK3GraUyzqku5ur8c4uV+y9XnPeskmI5aAP8ZrEAnoWIXK2fpDpeNqmSDJasmp\nPovjNqKmP+0vJKMCqmU9M5SF17JFEpU908BY+Q0CgYEA4Y4Vo8jDdR8eCzGfz1E9\nHt8zumMg8p8+ygRFKdUeuZTjXH2q8eKGL95fOczRT+0GlVozY1Cj3DSGNta/3GmR\nrrG/Prbq3ZLnyVWlm3ifNoO89pIVQfy9ko2qN6Xc9SaklFVuMefufbOJupXIhIND\ngNZ4q+VMVi2jlJWqYD0Js00=\n-----END PRIVATE KEY-----\n",
                        "client_email": "google-bucket-service-account@assam-mart.iam.gserviceaccount.com",
                        "client_id": "106828916831504058115",
                        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                        "token_uri": "https://oauth2.googleapis.com/token",
                        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/google-bucket-service-account%40assam-mart.iam.gserviceaccount.com"
                    },
                    projectId: "assam-mart"
                },
                bucket: "assamamrtbucket"
            })*/
        }),
        EmailPlugin.init({
            devMode: true,
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, 'templates'),
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
