import {Resolver} from "@nestjs/graphql";
import {Settlements} from "../../../entity/settlement/settlement.entity";
import {CRUDResolver, PagingStrategies} from "@nestjs-query/query-graphql";
import {InjectQueryService, QueryService} from "@nestjs-query/core";

@Resolver(() => Settlements)
export class SettlementsResolver extends CRUDResolver(Settlements, {
    pagingStrategy: PagingStrategies.OFFSET,
    enableAggregate: true,
    aggregate: {
        enabled: true
    },
    enableSubscriptions: true,
    create:{
        disabled: true
    },
    update: {
        disabled: true
    },
    delete: {
        disabled: true
    }
}){
    constructor(
        @InjectQueryService(Settlements) readonly service: QueryService<Settlements>
    ) {
        super(service);
    }

}
