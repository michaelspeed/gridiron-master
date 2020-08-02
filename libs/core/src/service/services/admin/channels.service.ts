import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {PrismaService} from '../global/prisma.service';
import {Channel} from '../../../entity';

@Injectable()
export class ChannelsService {

    constructor(
        @InjectConnection() private connection: Connection,
        private prisma: PrismaService
    ) {}

}
