import {Resolver} from "@nestjs/graphql";
import {Page} from "../../../entity";
import {CRUDResolver, PagingStrategies} from "@nestjs-query/query-graphql";
import {InjectQueryService, QueryService} from "@nestjs-query/core";

@Resolver(() => Page)
export class PageResolver extends CRUDResolver(Page, {
    pagingStrategy: PagingStrategies.OFFSET,
    enableAggregate: true,
    aggregate: {
        enabled: true
    },
    enableSubscriptions: true
}){
    constructor(
        @InjectQueryService(Page) readonly service: QueryService<Page>
    ) {
        super(service);
    }
}
