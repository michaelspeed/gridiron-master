import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Administrator, Delivery, User} from "../../../entity";

@Injectable()
export class DeliveryService {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}

    async SetNewDeliveryGuy(userId: string, adminId: string): Promise<Delivery> {
        return new Promise(async (resolve, reject) => {
            const user = await this.connection.getRepository(Administrator).findOne({where:{user:{id: adminId}}})
            if (user) {
                const deliv = new Delivery()
                deliv.user = await this.connection.getRepository(User).findOne({where:{id: userId}})
                this.connection.getRepository(Delivery).save(deliv)
                    .then(value => {
                        resolve(value)
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                reject('Unauthorized!')
            }
        })
    }
}
