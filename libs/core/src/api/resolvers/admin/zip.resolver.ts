import {Query, Resolver} from '@nestjs/graphql';
import {Zip} from '../../../entity';
import {CRUDResolver, PagingStrategies} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';
import {ZipService} from '../../../service/services/admin/zip.service';

@Resolver(of => Zip)
export class ZipResolver extends CRUDResolver(Zip, {
    pagingStrategy: PagingStrategies.OFFSET,
    enableAggregate: true,
    aggregate: {
        enabled: true
    },
    enableSubscriptions: true
}){
    constructor(
        @InjectQueryService(Zip) readonly service: QueryService<Zip>,
        private zipService: ZipService
    ) {
        super(service);
    }

    @Query(() => [Zip])
    findAllZip(): Promise<Zip[]> {
        return this.zipService.findAll()
    }
}
