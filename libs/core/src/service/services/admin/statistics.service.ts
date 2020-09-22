import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Between, Connection} from "typeorm";
import {OrderLine, Product} from "../../../entity";
import moment, {unitOfTime} from "moment";

@Injectable()
export class StatisticsService {
    constructor(
        @InjectConnection() readonly connection: Connection
    ) {}

    async getProductStatistics(productId: string, type: string = 'MONTH', store?: string) {
        return new Promise<any>(async (resolve, reject) => {
            const prod = await this.connection.getRepository(Product).findOne({where:{id: productId}, relations: ['variants']})
            const vards = prod.variants.map(item => item.id)
            let breaks = 1
            let adder: unitOfTime.DurationConstructor = 'day'
            if (type === 'YEAR') {
                breaks = 12
                adder = 'month'
            }
            const labelBuffers = []
            const datasource = []
            if (breaks === 1) {
                const now = moment()
                let subDate = moment(moment().subtract(1, "month").toDate())
                console.log(now.toDate(), subDate.toDate())
                const midData = await this.connection.getRepository(OrderLine)
                    .createQueryBuilder('orderLine')
                    .innerJoinAndSelect('orderLine.item', 'item')
                    .innerJoinAndSelect('item.productVariant', 'productVariant')

                midData.where('productVariant.id IN (:...vart)', {vart: vards})
                if (store) {
                    midData.innerJoinAndSelect('orderLine.store', 'store')
                    midData.andWhere('store.id = :store', {store: store})
                }
                midData.andWhere('orderLine.createdAt BETWEEN DATE(:sdate) AND DATE(:edate)', {sdate: subDate.toDate(), edate: now.toDate()})

            const getData = await midData.getMany()

                    /*.find({where: {createdAt: Between(subDate.startOf('day').toDate(), now.toDate())}, relations: ['item']})*/
                while (now.toDate() >= subDate.toDate()) {
                    labelBuffers.push(subDate.format('DD MMM YYYY'))
                    let sum = 0
                    let amountCount = 0
                    for (const items of getData) {
                        if (moment(items.createdAt).isSame(subDate, adder)) {
                            sum = sum + 1
                            const price: any = items.priceField
                            amountCount = (price.price * items.item.quantity) + amountCount
                        }
                    }
                    datasource.push({
                        sum,
                        amount: amountCount
                    })
                    subDate = subDate.add(1, adder)
                }
                resolve({
                    labels: labelBuffers,
                    datasource: datasource
                })
            } else {
                const now = moment()
                let subDate = moment(moment().subtract(1, "year").toDate())
                console.log(now.toDate(), subDate.toDate())
                const midData = await this.connection.getRepository(OrderLine)
                    .createQueryBuilder('orderLine')
                    .innerJoinAndSelect('orderLine.item', 'item')
                    .innerJoinAndSelect('item.productVariant', 'productVariant')


                midData.where('productVariant.id IN (:...vart)', {vart: vards})
                if (store) {
                    midData.innerJoinAndSelect('orderLine.store', 'store')
                    midData.andWhere('store.id = :store', {store: store})
                }
                midData.andWhere('orderLine.createdAt BETWEEN DATE(:sdate) AND DATE(:edate)', {sdate: subDate.toDate(), edate: now.toDate()})

                const getData = await midData.getMany()
                while (now.toDate() >= subDate.toDate()) {
                    labelBuffers.push(subDate.format('MMM'))
                    let sum = 0
                    let amountCount = 0
                    for (const items of getData) {
                        if (moment(items.createdAt).isSame(subDate, adder)) {
                            sum = sum + 1
                            const price: any = items.priceField
                            amountCount = (price.price * items.item.quantity) + amountCount
                        }
                    }
                    datasource.push({
                        sum,
                        amount: amountCount
                    })
                    subDate = subDate.add(1, adder)
                }
                resolve({
                    labels: labelBuffers,
                    datasource: datasource
                })
            }
        })
    }
}
