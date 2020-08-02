import {Mutation, Resolver} from '@nestjs/graphql';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';
import {Channel} from '../../../entity';
import {PagingTypes} from '../../dto/admin/paging-types';

@Resolver(of => Channel)
export class ChannelsResolver extends CRUDResolver(Channel, {
    read: {
        defaultResultSize: 10,
        maxResultsSize: 50
    }
}){
    constructor(
        @InjectQueryService(Channel) readonly service: QueryService<Channel>
    ) {
        super(service);
    }
}
