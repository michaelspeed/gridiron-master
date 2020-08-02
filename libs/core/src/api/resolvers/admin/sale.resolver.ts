import {Resolver} from '@nestjs/graphql';
import {Sale} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(() => Sale)
export class SaleResolver extends CRUDResolver(Sale){
    constructor(
        @InjectQueryService(Sale) readonly service: QueryService<Sale>
    ) {
        super(service);
    }
}
