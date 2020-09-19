import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {Asset, Product, ProductVariant, ProductVariantPrice, StockKeeping, Store, Vendor} from "../../../entity";

interface GetProductAssetInterface {
    variantId?: string
    prodId?: string
}

interface GetAvailability {
    stock: boolean
    zip: boolean
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

    async getPriceForVariants(id: string, zip?: string): Promise<ProductVariant> {
        return new Promise(async (resolve, reject) => {
            this.connection.getRepository(ProductVariant)
                .findOne({where:{id}, relations: ['price','price.promoprice', 'price.store', 'price.store.vendor', 'price.store.vendor.zip']})
                .then(value => resolve(value))
                .catch(error => reject(error))
        })
    }

    async GetStocksAndZipAvailability(storeId: string, variantId: string, zipf: number): Promise<GetAvailability> {
        return new Promise(async (resolve, reject) => {
            let stock = false
            let zip = false
            const vendor = await this.connection.getRepository(Vendor).findOne({where:{store: {id: storeId}}, relations: ['zip']})
            console.log(vendor.zip)
            if (vendor.zip.find(item => item.code = zipf)) {
                zip = true
            } else if (vendor.zip.length === 0) {
                zip = false
            }
            const stockMain = await this.connection.getRepository(StockKeeping).findOne({
                where:{
                    store: {
                        id: storeId
                    },
                    variant: {
                        id: variantId
                    }
                }
            })

            if (stockMain) {
                stock = stockMain.quantity > 0;
            }
            resolve({
                stock,
                zip
            })
        })
    }

    async ShiftProductVariant(name: string, productId: string): Promise<ProductVariant> {
        return new Promise(async (resolve, reject) => {
            const allvars = await this.connection.getRepository(ProductVariant).find({where:{product:{id: productId}}})
            const nameSplit = name.split(" ")
            for (const vars of allvars) {
                const varsplit = vars.name.replace(/[^a-zA-Z0-9 ]/gi, '').split(" ")
                if (nameSplit.every(elm => varsplit.includes(elm))) {
                    resolve(vars)
                }
            }
        })
    }
}
