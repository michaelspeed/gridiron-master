import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {Vendor, Zip} from '../../../entity';

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

    addZipToVendor(id: string, zips: string[]): Promise<Vendor> {
        return new Promise<Vendor>(async (resolve, reject) => {
            const vendor = await this.connection.getRepository(Vendor).findOne({where:{id}})
            const allZips = []
            for (const singz of zips) {
                const getzip = await this.connection.getRepository(Zip).findOne({where: {id: singz}})
                allZips.push(getzip)
            }
            vendor.zip = allZips
            this.connection.getRepository(Vendor).save(vendor).then(value => {
                resolve(value)
            }).catch(error => reject(error))
        })
    }
}
