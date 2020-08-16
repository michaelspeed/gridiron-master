import {Query, Resolver} from "@nestjs/graphql";
import {Store} from "../../../entity";
import {ShopStoreService} from "../../../service";

@Resolver(() => Store)
export class ShopStoreResolver {
    constructor(
        private readonly storeService: ShopStoreService
    ) {}

    @Query(() => Store)
    async GetDefaultStore(): Promise<Store> {
        return this.storeService.GetDefaultStore()
    }
}
