import {Resolver} from '@nestjs/graphql';
import {StockMovement} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(() => StockMovement)
export class StockMovementResolver extends CRUDResolver(StockMovement){
    constructor(
        @InjectQueryService(StockMovement) readonly service: QueryService<StockMovement>
    ) {
        super(service);
    }
}
