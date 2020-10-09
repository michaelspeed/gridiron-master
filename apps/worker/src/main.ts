import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DEF_CONFIG} from "./default-config";
import {BootstrapWorker} from "@gridiron/core";

async function bootstrap() {
  DEF_CONFIG.dbConnectionOptions = {...DEF_CONFIG.dbConnectionOptions, synchronize: false}

  BootstrapWorker(DEF_CONFIG).catch(error => {
    console.log(error)
  })

}
bootstrap();
