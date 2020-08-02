import {Resolver} from '@nestjs/graphql';
import {ProductAsset} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(of => ProductAsset)
export class ProductAssetResolver extends CRUDResolver(ProductAsset){
    constructor(
        @InjectQueryService(ProductAsset) readonly service: QueryService<ProductAsset>
    ) {
        super(service);
    }
}
