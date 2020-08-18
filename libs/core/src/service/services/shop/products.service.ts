import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Asset, Product, ProductVariant} from "../../../entity";

interface GetProductAssetInterface {
    variantId?: string
    prodId?: string
}

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
                    'product.options',
                    'product.options.options',
                    'product.variants',
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
                    'stock',
                    'price'
                ]}
            )
    }

    async getProdAsset({variantId, prodId}: GetProductAssetInterface): Promise<Asset> {
        return new Promise(async (resolve, reject) => {
            let asset
            if (variantId) {
                const variatn = await this.connection.getRepository(ProductVariant).findOne({where:{id: variantId}, relations: ['asset', 'asset.asset']})
                asset = variatn.asset.asset
            } else {
                const prod = await this.connection.getRepository(Product).findOne({where:{id: prodId}, relations: ['featuredAsset']})
                asset = prod.featuredAsset
            }
            resolve(asset)
        })
    }

    async getVariantsByProductId(id: string): Promise<ProductVariant[]> {
        return this.connection.getRepository(ProductVariant).find({
            where:{product: {id}},
            relations: [
                'product',
                'product.options',
                'product.options.options',
                'asset',
                'asset.asset',
                'specs',
                'seo',
                'stock',
                'price',
                'price.store',
            ]
        })
    }

    async singleProductById(id: string): Promise<Product> {
        return this.connection.getRepository(Product).findOne({
            where:{
                id
            },
            relations: ['collection', 'options', 'featuredAsset', 'facets', 'assets', 'variants']
        })
    }
}
