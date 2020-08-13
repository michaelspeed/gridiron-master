import {Query, Resolver} from "@nestjs/graphql";
import {Collection} from "../../../entity";
import {ShopCollectionService} from "../../../service";

@Resolver(of => Collection)
export class ShopCollectionResolver {
    constructor(
        private readonly collectionService: ShopCollectionService
    ) {}

    @Query(() => [Collection])
    async getAllCollection(): Promise<Collection[]> {
        return this.collectionService.getCollections()
    }
}
