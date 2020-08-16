import {Args, ID, Query, Resolver} from "@nestjs/graphql";
import {Asset, ProductVariant} from "../../../entity";
import {ShopProductsService} from "../../../service";

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

    @Query(() => Asset)
    async getProductAsset(
        @Args('variantId', {type: () => ID, nullable: true}) variantId: string,
        @Args('prodId', {type: () => ID, nullable: true}) prodId: string,
    ): Promise<Asset> {
        return this.shopProductsService.getProdAsset({variantId, prodId})
    }
}
