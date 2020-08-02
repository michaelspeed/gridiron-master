import {Resolver} from '@nestjs/graphql';
import {Facet} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';

@Resolver(of => Facet)
export class FacetsResolver extends CRUDResolver(Facet, {

}){
    constructor(
        @InjectQueryService(Facet) readonly service: QueryService<Facet>
    ) {
        super(service);
    }
}
