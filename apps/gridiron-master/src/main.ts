import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BootstrapServer, BootstrapWorker, runMigrations} from '@gridiron/core';
import {DEF_CONFIG} from './default-config';

async function bootstrap() {
  // runMigrations(DEF_CONFIG)

  BootstrapServer(DEF_CONFIG as any).then(async() => {
    console.log('SERVER INIT')
  })
}
bootstrap();
