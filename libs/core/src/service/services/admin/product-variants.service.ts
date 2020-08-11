import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {
    Asset,
    Product,
    ProductOption,
    ProductOptionGroup,
    ProductVariant, ProductVariantAsset,
    ProductVariantPrice,
    ProductVariantSpecifications, Store, StoreTypeEnum,
    TaxRate
} from '../../../entity';
import slugify from 'slugify'
import {cartesianProduct} from '../../helpers/cartesianCalculation';
import {ProductOptionsDto, ProductOptionsInputDto} from '../../../api/dto/admin/private-variant';
import fastCartesian from 'fast-cartesian'

@Injectable()
export class ProductVariantsService {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}

    async createProductVariantSpecs(id: string, specs: any): Promise<ProductVariantSpecifications> {
        return new Promise(async (resolve, reject) => {
            const variant = await this.connection.getRepository(ProductVariant).findOne({where:{id: id}})
            const pvspecs = new ProductVariantSpecifications()
            pvspecs.variant = variant
            pvspecs.specs = specs
            this.connection.getRepository(ProductVariantSpecifications).save(pvspecs)
                .then(value => resolve(value)).catch(error => reject(error))
        })
    }

    async updateProductVariantSpecs(id: string, specs: any): Promise<ProductVariantSpecifications> {
        return new Promise(async (resolve, reject) => {
            const specVar = await this.connection.getRepository(ProductVariantSpecifications).findOne({where:{id}})
            specVar.specs = specs
            this.connection.getRepository(ProductVariantSpecifications).save(specVar)
                .then(value => resolve(value)).catch(error => reject(error))
        })
    }

    async createProductOptions(
        prodId: string,
        options: ProductOptionsDto[]
    ): Promise<ProductVariant[]> {
        return new Promise(async (resolve, reject) => {
            const product = await this.connection.getRepository(Product).findOne({where:{id: prodId}})
            let cartesianArray = []
            for (let opts of options) {
                cartesianArray.push(opts.optionTags)
                const optionCode = `${product.slug}-${slugify(opts.optionname, {lower: true, strict: true})}`
                const optionGroup = new ProductOptionGroup()
                optionGroup.name = opts.optionname
                optionGroup.code = optionCode
                optionGroup.product = product
                const poptions = await this.connection.getRepository(ProductOptionGroup).save(optionGroup)
                for (let mainopts of opts.optionTags) {
                    const options = new ProductOption()
                    options.code = mainopts
                    options.name = mainopts.toUpperCase()
                    options.group = poptions
                    await this.connection.getRepository(ProductOption).save(options)
                }
            }

            const fastCas = fastCartesian(cartesianArray)
            let prodVariants: any[] = []
            for (let itsm of fastCas) {
                const prodvariant = new ProductVariant()
                prodvariant.name = `${product.productName} ${itsm.join(' ')}`
                prodvariant.product = product
                const pordverd = await this.connection.getRepository(ProductVariant).save(prodvariant)
                prodVariants.push(prodvariant)
            }
            resolve(prodVariants)
        })
    }

    async updateProductVariantPrice(
        variantPriceId: string,
        price: number,
        taxId: string,
        included: boolean
    ): Promise<ProductVariantPrice> {
        return new Promise(async (resolve, reject) => {
            const variantPrice = await this.connection.getRepository(ProductVariantPrice).findOne({where: {id: variantPriceId}})
            variantPrice.price = price
            variantPrice.taxIncluded = included
            variantPrice.tax = await this.connection.getRepository(TaxRate).findOne({where:{id: taxId}})
            this.connection.getRepository(ProductVariantPrice).save(variantPrice)
                .then(value => resolve(value)).catch(error => reject(error))
        })
    }

    async updateProductVariantAsset(
        id: string,
        assetId: string
    ): Promise<ProductVariantAsset> {
        return new Promise(async (resolve, reject) => {
            const variant = await this.connection.getRepository(ProductVariant).findOne({where:{id}, relations: ['asset']})
            const asset = await this.connection.getRepository(Asset).findOne({where:{id: assetId}})
            if (variant.asset === null) {
                const variantAsset = new ProductVariantAsset()
                variantAsset.variant = variant
                variantAsset.asset = asset
                this.connection.getRepository(ProductVariantAsset).save(variantAsset)
                    .then(value => resolve(value)).catch(error => reject(error))
            } else {
                const variantAsset = await this.connection.getRepository(ProductVariantAsset).findOne({where:{id: variant.asset.id}})
                variantAsset.variant = variant
                variantAsset.asset = asset
                this.connection.getRepository(ProductVariantAsset).save(variantAsset)
                    .then(value => resolve(value)).catch(error => reject(error))
            }
        })
    }

    async createProductVariantPrice(
        prodvaraintId: string,
        price: number,
        taxId: string,
        included: boolean,
        storeId?: string
    ): Promise<ProductVariantPrice> {
        return new Promise(async (resolve, reject) => {
            const newprice = new ProductVariantPrice()
            const store = await this.connection.getRepository(Store).findOne({where: {id: storeId}})
            if (store) {
                newprice.price = price
                newprice.taxIncluded = included
                newprice.tax = await this.connection.getRepository(TaxRate).findOne({where: {id: taxId}})
                newprice.variant = await this.connection.getRepository(ProductVariant).findOne({where:{id: prodvaraintId}})
                newprice.store = store
                this.connection.getRepository(ProductVariantPrice)
                    .save(newprice).then(value => resolve(value)).catch(error => reject(error))
            } else {
                const newStore = await this.connection.getRepository(Store).findOne({where: {type: StoreTypeEnum.DEFAULT}})
                newprice.price = price
                newprice.taxIncluded = included
                newprice.tax = await this.connection.getRepository(TaxRate).findOne({where: {id: taxId}})
                newprice.variant = await this.connection.getRepository(ProductVariant).findOne({where:{id: prodvaraintId}})
                newprice.store = newStore
                this.connection.getRepository(ProductVariantPrice)
                    .save(newprice).then(value => resolve(value)).catch(error => reject(error))
            }
        })
    }

    async getProductVariantPrice(
        productVariantId: string,
        storeId: string
    ): Promise<ProductVariantPrice | null> {
        return new Promise(async (resolve, reject) => {
            const prodvar = await this.connection.getRepository(ProductVariantPrice).findOne({where: {variant: {id: productVariantId}, store:{id: storeId}}, relations: ['tax']})
            console.log(prodvar)
            resolve(prodvar)
        })
    }
}
