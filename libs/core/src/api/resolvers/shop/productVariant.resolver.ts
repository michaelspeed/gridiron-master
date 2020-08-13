import {Args, ID, Query, Resolver} from "@nestjs/graphql";
import {ProductVariant} from "../../../entity";
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
}
