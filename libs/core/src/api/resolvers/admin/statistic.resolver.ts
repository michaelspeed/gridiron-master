import {Args, ID, Query, Resolver} from "@nestjs/graphql";
import {DataSource, StatisticeDto} from "../../dto/admin/statistice.dto";
import {StatisticsService} from "../../../service";

@Resolver(() => StatisticeDto)
export class StatisticResolver {
    constructor(
        private readonly statisticService: StatisticsService
    ) {}

    @Query(() => StatisticeDto)
    async GetProductSaleData(
        @Args('productId', {type: () => ID}) productId: string,
        @Args('type') type: string,
        @Args('storeId', {nullable: true}) storeId: string,
    ): Promise<StatisticeDto> {
        return this.statisticService.getProductStatistics(productId, type, storeId)
    }
}
