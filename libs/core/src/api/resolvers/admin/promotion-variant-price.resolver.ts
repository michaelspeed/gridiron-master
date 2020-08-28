import {Resolver} from "@nestjs/graphql";
import {ProductVariantPrice, PromotionVariantPrice} from "../../../entity";
import {CRUDResolver, PagingStrategies} from "@nestjs-query/query-graphql";
import {InjectQueryService, QueryService} from "@nestjs-query/core";

@Resolver(of => PromotionVariantPrice)
export class PromotionVariantPriceResolver extends CRUDResolver(PromotionVariantPrice, {
    pagingStrategy: PagingStrategies.OFFSET,
    enableAggregate: true,
    aggregate: {
        enabled: true
    },
    enableSubscriptions: true
}){
    constructor(
        @InjectQueryService(PromotionVariantPrice) readonly service: QueryService<PromotionVariantPrice>
    ) {
        super(service);
    }
}
