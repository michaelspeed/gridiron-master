import {Resolver} from '@nestjs/graphql';
import {Order} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(() => Order)
export class OrderResolver extends CRUDResolver(Order){
    constructor(
        @InjectQueryService(Order) readonly service: QueryService<Order>
    ) {
        super(service);
    }
}
