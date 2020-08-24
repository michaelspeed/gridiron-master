import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren, TreeParent,
    UpdateDateColumn
} from "typeorm";
import {Connection, FilterableField, PagingStrategies, Relation} from "@nestjs-query/query-graphql";
import {BillingAgreement, Product, ProductQuery, Seo} from "@gridiron/core";

@ObjectType('Collection')
@Connection('agreements', () => BillingAgreement, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Connection('products', () => ProductQuery, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Connection('children', () => CollectionQuery, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('parent', () => CollectionQuery, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('seo', () => Seo, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class CollectionQuery {
    @FilterableField(() => ID)
    id: string;

    @FilterableField()
    createdAt: Date;

    @FilterableField()
    updatedAt: Date;

    @FilterableField()
    isRoot: boolean;

    @FilterableField()
    inMenu: boolean;

    @FilterableField()
    position: number;

    @FilterableField()
    isPrivate: boolean;

    @FilterableField()
    name: string

    @FilterableField()
    description: string

    children: CollectionQuery[]

    parent: CollectionQuery

    products: Product[]

    seo: Seo

    agreements: BillingAgreement[]
}
