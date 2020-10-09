import { Module } from '@nestjs/common';
import { EmailPluginService } from './email-plugin.service';

@Module({
  providers: [EmailPluginService],
  exports: [EmailPluginService],
})
export class EmailPluginModule {}
