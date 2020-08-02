import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Order, OrderLine, ProductVariant, TaxCategory} from '..';

@ObjectType('OrderItem')
@Entity({name: 'order-item'})
@Relation('productVariant', () => ProductVariant)
@Relation('taxCategory', () => TaxCategory)
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
    unitPrice: number;

    @FilterableField()
    @Column()
    quantity: number;

    @ManyToOne(type => ProductVariant)
    productVariant: ProductVariant;

    @ManyToOne(type => TaxCategory)
    taxCategory: TaxCategory;
}
