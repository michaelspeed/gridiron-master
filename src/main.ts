import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BootstrapServer} from '@gridiron/core';
import {DEF_CONFIG} from './default-config';
import NuxtConfig from '../nuxt.config';
import {Builder, Nuxt, loadNuxt, build} from 'nuxt';
import {NuxtFilter} from './nuxt.filter';

async function bootstrap() {
  BootstrapServer(DEF_CONFIG as any).then(async() => {
    const app = await NestFactory.create(AppModule);
    const isDev = process.env.NODE_ENV === 'development'
    const client = new Nuxt(NuxtConfig)
    if (isDev) {
      new Builder(client).build()
    } else {
      client.ready()
    }
    app.useGlobalFilters(new NuxtFilter(client));
    await app.listen(3000);
  })
}
bootstrap();
