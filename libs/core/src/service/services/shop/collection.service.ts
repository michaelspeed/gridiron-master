import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection, Not} from "typeorm";
import {Collection} from "../../../entity";

@Injectable()
export class ShopCollectionService {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}

    async getCollections(): Promise<Collection[]> {
        return this.connection.getRepository(Collection).find({where: {name: Not('default')}})
    }
}
