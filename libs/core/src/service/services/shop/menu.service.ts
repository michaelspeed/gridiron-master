import {Injectable} from '@nestjs/common';
import {Collection} from '../../../entity';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

@Injectable()
export class MenuService {

    constructor(
       @InjectConnection() private connection: Connection
    ) {}

    async GetCollectionTree(): Promise<Collection[]> {
        return this.connection.getTreeRepository(Collection).findTrees()
    }
}
