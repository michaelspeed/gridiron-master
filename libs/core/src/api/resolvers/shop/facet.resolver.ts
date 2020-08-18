import {Args, ID, Query, Resolver} from "@nestjs/graphql";
import {Facet, Product} from "../../../entity";
import {ShopFacetService} from "../../../service";

@Resolver(() => Facet)
export class SearchFacetResolver {
    constructor(
        private readonly shopFacetService: ShopFacetService
    ) {}

    @Query(() => [Product])
    async queryFacet(
        @Args('id', {type: () => ID}) id: string,
        @Args('collection', {type: () => ID, nullable: true}) collection: string,
    ): Promise<Product[]> {
        return this.shopFacetService.facetPageService(id, collection)
    }
}
