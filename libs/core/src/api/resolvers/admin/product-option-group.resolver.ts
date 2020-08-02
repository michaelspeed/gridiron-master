import {Resolver} from '@nestjs/graphql';
import {ProductOptionGroup} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(of => ProductOptionGroup)
export class ProductOptionGroupResolver extends CRUDResolver(ProductOptionGroup){
    constructor(
        @InjectQueryService(ProductOptionGroup) readonly service: QueryService<ProductOptionGroup>
    ) {
        super(service);
    }
}
