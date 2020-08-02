import {BaseEntity, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Order, OrderItem, ProductVariant, TaxCategory} from '..';

@ObjectType('OrderLine')
@Entity({name: 'order-line'})
@Relation('order', () => Order)
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

    @OneToOne(() => Order, order => order.item)
    order: Order

}
