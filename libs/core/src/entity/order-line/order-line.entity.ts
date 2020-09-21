import {
    BaseEntity, Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {FilterableField, FilterableRelation, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {DeliveryPool, Order, OrderItem, ProductVariant, Store, TaxCategory, Vendor} from '..';
import GraphQLJSON from "graphql-type-json";
import {OrderStageType} from "@gridiron/core/enums";

registerEnumType(OrderStageType, {
    name: 'OrderStageType'
})

@ObjectType('OrderLine')
@Entity({name: 'order-line'})
@Relation('order', () => Order, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('item', () => OrderItem, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@FilterableRelation('store', () => Store, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, relationName: 'store'})
@FilterableRelation('pool', () => DeliveryPool, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, relationName: 'pool'})
export class OrderLine extends BaseEntity {

    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => GraphQLJSON)
    @Column("simple-json")
    priceField: JSON

    @FilterableField()
    @Column({type: "enum", enum: OrderStageType, default: OrderStageType.CREATED})
    stage: OrderStageType

    @ManyToOne(() => Order, order => order.line)
    order: Order

    // @Field(() => OrderItem)
    @OneToOne(() => OrderItem, item => item)
    @JoinColumn()
    item: OrderItem

    // @Field(() => Store)
    @ManyToOne(() => Store, vendor => vendor.line)
    store: Store

    @ManyToOne(() => DeliveryPool, pool => pool.lines)
    pool: DeliveryPool
}
