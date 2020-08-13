import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {ProductVariant} from "../../../entity";

@Injectable()
export class ShopProductsService {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}

    async getProductById(id: string): Promise<ProductVariant> {
        return this.connection.getRepository(ProductVariant).findOne(
            {where: {id},
                relations: [
                    'product',
                    'product.collection',
                    'product.collection.seo',
                    'product.featuredAsset',
                    'product.facets',
                    'product.facets.facet',
                    'product.assets',
                    'product.assets.asset',
                    'asset',
                    'asset.asset',
                    'specs',
                    'seo',
                    'stock'
                ]}
            )
    }
}
