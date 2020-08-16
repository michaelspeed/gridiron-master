import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection, getConnection, In, Not} from "typeorm";
import {Collection, FacetValue, ProductVariant} from "../../../entity";

@Injectable()
export class ShopCollectionService {
    constructor(
        @InjectConnection() private connection: Connection
    ) {}

    async getCollections(): Promise<Collection[]> {
        return this.connection.getRepository(Collection).find({where: {name: Not('default')}})
    }

    async GetCollectionTree(): Promise<Collection[]> {
        return getConnection().getTreeRepository(Collection).findTrees()
    }

    async GetSingleCollection(id: string): Promise<Collection> {
        return this.connection.getRepository(Collection).findOne({where:{id}, relations: ['seo', 'children']})
    }

    async GetCollectionFacets(id: string): Promise<FacetValue[]> {
        return new Promise(async (resolve, reject) => {
            const col = await this.connection.getRepository(Collection).findOne({where:{id}, relations:['products', 'children', 'children.products']})
            let prods = []
            for (const progs of col.products) {
                prods.push(progs.id)
            }
            for(const child of col.children) {
                for (const childprod of child.products) {
                    if (prods.indexOf(childprod.id) === -1) {
                        prods.push(childprod.id)
                    }
                }
            }
            if (prods.length === 0) {
                resolve([])
            } else {
                const facets = await this.connection.getRepository(FacetValue)
                    .createQueryBuilder('facetValue')
                    .innerJoinAndSelect('facetValue.product', 'product')
                    .leftJoinAndSelect('facetValue.facet', 'facet')
                    .where(`product.id IN (:...prods)`, {prods}).getMany()
                resolve(facets)
            }
        })
    }

    async GetAllProductForCollection(id: string, limit?: number, search?: string): Promise<ProductVariant[]> {
        return new Promise(async (resolve, reject) => {
            const col = await this.connection.getRepository(Collection).findOne({where:{id}, relations:['products']})
            let prods = []
            for (const progs of col.products) {
                prods.push(progs.id)
            }
            if (prods.length === 0) {
                resolve([])
            } else {
                const qb = this.connection.getRepository(ProductVariant)
                    .createQueryBuilder('productVariant')
                    .innerJoinAndSelect('productVariant.product', 'product')
                    .leftJoinAndSelect('productVariant.asset', 'asset')
                    .leftJoinAndSelect('asset.asset', 'mainasset')
                    .where(`product.id IN (:...prods)`, {prods})

                if (search) {
                    qb.andWhere(`(productVariant.name LIKE '%${search}%')`)
                }


                if (limit) {
                    qb.limit(limit)
                }

                const variant = await qb.getMany()
                resolve(variant)
            }
        })
    }
}
