import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Order, OrderItem, OrderLine, ProductVariantPrice, User} from "../../../entity";
import {OrderStageType} from "@gridiron/core";
import {OrderLineDto} from "../../../api/dto/admin/OrderLineDto";
import {classToPlain} from "class-transformer";

@Injectable()
export class OrderService {
    constructor(
        @InjectConnection() private connection: Connection,
    ) {}

    async createOrder(userId: string, priceIds: OrderLineDto[], address: string): Promise<Order> {
        return new Promise(async (resolve, reject) => {
            console.log(userId, priceIds, address)
            const neworder = new Order()
            neworder.user = await this.connection.getRepository(User).findOne({id: userId})
            let prodVars: OrderLine[] = []
            let totalAmt = 0
            for (const prices of priceIds) {
                const productPrice = await this.connection.getRepository(ProductVariantPrice).findOne({where:{id: prices.priceId}, relations: ['variant', 'tax', 'store']})
                const stringPrice = JSON.stringify(productPrice)
                console.log(productPrice)
                const newOrderItem = new OrderItem()
                newOrderItem.quantity = prices.quantity
                newOrderItem.productVariant = productPrice.variant
                newOrderItem.taxCategory = productPrice.tax
                const norderitem = await this.connection.getRepository(OrderItem).save(newOrderItem)
                totalAmt = totalAmt + productPrice.price
                const newOrDerLine = new OrderLine()
                newOrDerLine.store = productPrice.store
                newOrDerLine.priceField = classToPlain(productPrice) as any
                newOrDerLine.stage = OrderStageType.CREATED
                newOrDerLine.item = norderitem
                const savedOrderline = await this.connection.getRepository(OrderLine).save(newOrDerLine)
                prodVars.push(savedOrderline)
            }
            neworder.line = prodVars
            neworder.totalPrice = totalAmt
            neworder.address = address
            const savedOrder = await this.connection.getRepository(Order).save(neworder)
            resolve(savedOrder)
        })
    }
}
