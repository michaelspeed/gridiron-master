import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Serviceable, Vendor, Product} from "../../../entity";

@Injectable()
export class ServiceableService {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}

    async addServiceableToVendor(service: string, vendor:string): Promise<Serviceable> {
        const fvendor = await this.connection.getRepository(Vendor).findOne(vendor)
        const fservice = await this.connection.getRepository(Serviceable).findOne(service)
        fservice.vendors.push(fvendor)
        return this.connection.getRepository(Serviceable).save(fservice)
    }

    async addServiceableToProduct(service: string, product: string): Promise<Serviceable> {
        const fprod = await this.connection.getRepository(Product).findOne(product)
        const fservice = await this.connection.getRepository(Serviceable).findOne(service)
        fservice.product.push(fprod)
        return this.connection.getRepository(Serviceable).save(fservice)
    }
}
