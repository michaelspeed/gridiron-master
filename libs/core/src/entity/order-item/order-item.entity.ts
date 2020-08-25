import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {Order, OrderLine, ProductVariant, TaxCategory, TaxRate} from '..';

@ObjectType('OrderItem')
@Entity({name: 'order-item'})
@Relation('productVariant', () => ProductVariant, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('taxCategory', () => TaxRate, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('line', () => OrderLine, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class OrderItem extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @FilterableField()
    @Column()
    quantity: number;

    @ManyToOne(type => ProductVariant, variant => variant.line)
    productVariant: ProductVariant;

    @ManyToOne(type => TaxRate)
    taxCategory: TaxRate;

    @OneToOne(() => OrderLine, line => line.item)
    line: OrderLine
}
