import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {Zip} from '../../../entity';

@Injectable()
export class ZipService {
    constructor(
        @InjectConnection() readonly connection: Connection
    ) {}

    findAll(): Promise<Zip[]> {
        return new Promise<Zip[]>((resolve, reject) => {
            this.connection.getRepository(Zip).find().then(value => {
                resolve(value)
            }).catch(error => reject(error))
        })
    }
}
