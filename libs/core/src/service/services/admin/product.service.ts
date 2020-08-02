import {Injectable} from '@nestjs/common';
import {Asset, Collection, FacetValue, Product, ProductAsset} from '../../../entity';
import {InjectConnection} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {EventBus, ProductEvents} from '../../../event-bus';

@Injectable()
export class ProductService {
    constructor(
        @InjectConnection() private connection: Connection,
        private eventBus: EventBus
    ) {}

    createProduct(name: string, desc: string, slug: string, assets:string[], facets: string[], featured: string): Promise<Product> {
        return new Promise<Product>(async (resolve, reject) => {
            const prod = new Product()
            prod.productName = name
            prod.description = desc
            prod.slug = slug
            prod.featuredAsset = await this.connection.getRepository(Asset).findOne({where: {id: featured}})
            let prodFacet: FacetValue[] = []
            for (const facetId of facets) {
                const face = await FacetValue.findOne({where: {id: facetId}})
                prodFacet.push(face)
            }
            prod.facets = prodFacet
            this.connection.getRepository(Product).save(prod).then(async (value) => {
                let allProdAssets: ProductAsset[] = []
                for (const assetId of assets) {
                    const asset = await this.connection.getRepository(Asset).findOne({where: {id: assetId}})
                    const prodAsset = new ProductAsset()
                    prodAsset.asset = asset
                    prodAsset.product = value
                    const passet = await prodAsset.save()
                    allProdAssets.push(passet)
                }
                this.eventBus.publish(new ProductEvents(value, 'created'))
                resolve(prod)
            })
        })
    }

    updateProductCollection(id: string, collectionId: string): Promise<Product> {
        return new Promise<Product>(async (resolve, reject) => {
            const prod = await this.connection.getRepository(Product).findOne({where:{id}})
            prod.collection = await this.connection.getRepository(Collection).findOne({where: {id: collectionId}})
            console.log(prod)
            this.connection.getRepository(Product).save(prod)
                .then(value => resolve(value)).catch(error => reject(error))
        })
    }

    updateProduct(id: string, name: string, desc: string, assets:string[], facets: string[], featured: string): Promise<Product> {
        return new Promise<Product>(async (resolve, reject) => {
            const prod = await Product.findOne({where: {id}})
            prod.productName = name
            prod.description = desc
            let prodFacet: FacetValue[] = []
            prod.featuredAsset = await this.connection.getRepository(Asset).findOne({where: {id: featured}})
            for (const facetId of facets) {
                const face = await FacetValue.findOne({where: {id: facetId}})
                await prodFacet.push(face)
            }
            prod.facets = prodFacet
            this.connection.getRepository(Product).save(prod).then(value => {
                resolve(value)
            })
        })
    }
}
