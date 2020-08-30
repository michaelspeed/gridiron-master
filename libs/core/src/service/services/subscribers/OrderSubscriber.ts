import {Between, EntitySubscriberInterface, EventSubscriber, getConnection, UpdateEvent} from "typeorm";
import {DeliveryPool, DeliverySignIn, OrderLine} from "../../../entity";
import {OrderStageType} from "../../../enums";
import moment from "moment";
import * as _ from 'lodash'
import {DeliveryStranded} from "@gridiron/core/entity/delivery/delivery-stranded.entity";

interface PoolInterface {
    id: string
    length: number
}

@EventSubscriber()
export class OrderLineSubscriber implements EntitySubscriberInterface<OrderLine>{
    listenTo(): Function | string {
        return OrderLine
    }

    afterUpdate(event: UpdateEvent<OrderLine>): Promise<any> | void {
        return new Promise(async (resolve, reject) => {
            if (event.entity.stage === OrderStageType.PACKAGED) {
                const deliverySignIns = await getConnection().getRepository(DeliverySignIn)
                    .find({
                        where: {
                            createdAt: Between(moment().startOf("day").toDate(), moment().endOf("day").toDate()),
                            online: true
                        },
                        relations: ['pool', 'pool.lines']
                    })
                const deliveryPools: PoolInterface[] = []
                for (const signIn of deliverySignIns) {
                    deliveryPools.push({
                        id: signIn.pool.id,
                        length: signIn.pool.lines.length
                    })
                }
                const ordered = _.orderBy(deliveryPools, e => e.length, ['desc'])
                if (ordered.length === 0 ) {
                    const deliveryStranded = new DeliveryStranded()
                    deliveryStranded.orderId = event.entity.id
                    getConnection().getRepository(DeliveryStranded)
                        .save(deliveryStranded)
                        .then(value => resolve(value))
                } else if (ordered[0].length >= 10) {
                    const deliveryStranded = new DeliveryStranded()
                    deliveryStranded.orderId = event.entity.id
                    getConnection().getRepository(DeliveryStranded)
                        .save(deliveryStranded)
                        .then(value => resolve(value))
                } else {
                    event.entity.pool = await getConnection().getRepository(DeliveryPool).findOne({where:{id: ordered[0].id}})
                    event.entity.save()
                        .then(value => resolve(value))
                }
            } else {
                resolve()
            }
        })
    }
}
