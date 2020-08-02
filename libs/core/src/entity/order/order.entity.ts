import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {OrderItem, OrderLine} from '..';

@ObjectType('Order')
@Entity({name: 'order'})
@Relation('item', () => OrderLine)
export class Order extends BaseEntity {
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
    orderPlacedAt?: Date;

    @FilterableField()
    @Column()
    totalPrice: number;

    @FilterableField()
    @Column({type: 'text'})
    address: string

    @OneToOne(() => OrderLine, item => item.order)
    @JoinColumn()
    item: OrderLine

}
