import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Address, Order, OrderItem, OrderLine, ProductVariantPrice, User} from "../../../entity";
import {CartItem} from "../../../enums/cartInterface";
import {classToPlain} from "class-transformer";
import {OrderStageType} from "@gridiron/core";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class ShopOrderService {
    constructor(
        @InjectConnection() private connection: Connection,
        private readonly jwtService: JwtService
    ) {}

    async DecryptToken(token: string): Promise<{userId: string}> {
        return new Promise(async (resolve, reject) => {
            const decoded: any = await this.jwtService.decode(token)
            resolve(decoded)
        })
    }

    async createShopOrder(items: CartItem[], userId: string, address: string): Promise<Order> {
        return new Promise(async (resolve, reject) => {
            const prodVars: OrderLine[] = []
            let totalAmt = 0
            for (const prod of items) {
                const prodVarPrice = await this.connection.getRepository(ProductVariantPrice).findOne({where:{id: prod.priceId}, relations: ['variant', 'tax', 'store']})
                const newOrderItem = new OrderItem()
                newOrderItem.quantity = prod.quantity
                newOrderItem.productVariant = prodVarPrice.variant
                newOrderItem.taxCategory = prodVarPrice.tax
                const orderitemsaved = await this.connection.getRepository(OrderItem).save(newOrderItem)
                const newOrderLine = new OrderLine()
                newOrderLine.store = prodVarPrice.store
                newOrderLine.priceField = classToPlain(prodVarPrice) as any
                newOrderLine.stage = OrderStageType.CREATED
                newOrderLine.item = orderitemsaved
                const orderlinesaved = await this.connection.getRepository(OrderLine).save(newOrderLine)
                prodVars.push(orderlinesaved)
                totalAmt = totalAmt + prodVarPrice.price
            }
            const neworder = new Order()
            neworder.user = await this.connection.getRepository(User).findOne({id: userId})
            neworder.line = prodVars
            neworder.address = address
            neworder.totalPrice = totalAmt
            const saveOrder = await this.connection.getRepository(Order).save(neworder)
            resolve(saveOrder)
        })
    }
}
