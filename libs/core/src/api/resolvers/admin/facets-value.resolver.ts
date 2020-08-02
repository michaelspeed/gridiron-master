import {Resolver} from '@nestjs/graphql';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';
import {FacetValue} from '../../../entity';

@Resolver(of => FacetValue)
export class FacetsValueResolver extends CRUDResolver(FacetValue){
    constructor(
        @InjectQueryService(FacetValue) readonly service: QueryService<FacetValue>
    ) {
        super(service);
    }
}
