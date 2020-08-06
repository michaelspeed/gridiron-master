import {Resolver} from '@nestjs/graphql';
import {Order} from '../../../entity';
import {CRUDResolver, PagingStrategies} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(() => Order)
export class OrderResolver extends CRUDResolver(Order, {
    pagingStrategy: PagingStrategies.OFFSET,
    enableAggregate: true,
    aggregate: {
        enabled: true
    },
    enableSubscriptions: true
}){
    constructor(
        @InjectQueryService(Order) readonly service: QueryService<Order>
    ) {
        super(service);
    }
}
