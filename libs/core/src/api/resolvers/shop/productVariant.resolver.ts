import {Args, Field, ID, Int, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {Asset, Product, ProductVariant} from "../../../entity";
import {ShopProductsService} from "../../../service";

@ObjectType()
class StockZip {
    @Field()
    stock: boolean

    @Field()
    zip: boolean
}

@Resolver(of => ProductVariant)
export class ShopProductVariantResolver {
    constructor(
        private readonly shopProductsService: ShopProductsService
    ) {}

    @Query(() => ProductVariant)
    async getSingleProductVariant(
        @Args('id', {type: () => ID}) id: string,
    ): Promise<ProductVariant> {
        return this.shopProductsService.getProductById(id)
    }

    @Query(() => Product)
    async singProductInfo(
        @Args('id', {type: () => ID}) id: string,
    ): Promise<Product> {
        return this.shopProductsService.singleProductById(id)
    }

    @Query(() => ProductVariant)
    async singProductPrice(
        @Args('id', {type: () => ID}) id: string,
    ): Promise<ProductVariant> {
        return this.shopProductsService.getPriceForVariants(id)
    }

    @Query(() => StockZip)
    async GetStocksAndZipAvailability(
        @Args('storeId', {type: () => ID}) storeId: string,
        @Args('variantId', {type: () => ID}) variantId: string,
        @Args('zipf', {type: () => Int}) zipf: number,
    ): Promise<StockZip> {
        return this.shopProductsService.GetStocksAndZipAvailability(storeId, variantId, zipf)
    }

    @Query(() => [ProductVariant])
    async getProductVariantByProduct(
        @Args('id', {type: () => ID}) id: string,
    ): Promise<ProductVariant[]> {
        return this.shopProductsService.getVariantsByProductId(id)
    }

    @Query(() => Asset)
    async getProductAsset(
        @Args('variantId', {type: () => ID, nullable: true}) variantId: string,
        @Args('prodId', {type: () => ID, nullable: true}) prodId: string,
    ): Promise<Asset> {
        return this.shopProductsService.getProdAsset({variantId, prodId})
    }
}
