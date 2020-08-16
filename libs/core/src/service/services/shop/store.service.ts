import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Store, StoreTypeEnum} from "@gridiron/core/entity";

@Injectable()
export class ShopStoreService {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}

    async GetDefaultStore(): Promise<Store> {
        return  this.connection.getRepository(Store).findOne({where:{type: StoreTypeEnum.DEFAULT}})
    }
}
