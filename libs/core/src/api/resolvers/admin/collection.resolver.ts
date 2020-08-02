import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Collection, Seo} from '../../../entity';
import {CRUDResolver} from '@nestjs-query/query-graphql';
import {InjectQueryService, QueryService} from '@nestjs-query/core';
import {CollectionService} from '../../../service/services/admin/collection.service';
import {ID} from '@gridiron/core';

@Resolver(of => Collection)
export class CollectionResolver extends CRUDResolver(Collection, {
    relations: {
        many: {
            children: {DTO: Collection, disableRemove: false}
        },
        one: {
            parent: {DTO: Collection, disableRemove: true},
            seo: {DTO: Seo}
        }
    }
}){
    constructor(
        @InjectQueryService(Collection) readonly service: QueryService<Collection>,
        private readonly collectionService: CollectionService
    ) {
        super(service);
    }

    @Query(() => [Collection])
    async GetCollectionTree(): Promise<Collection[]> {
        return this.collectionService.GetCollectionTree()
    }

    @Mutation(() => Collection)
    async AddParentToChildCollection(
        @Args('parentId') parentId: string,
        @Args('childId') childId: string,
    ): Promise<Collection> {
        return this.collectionService.AddParentToChildCollection(parentId, childId)
    }
}
