import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableConnection, FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {OrderItem, OrderLine, User} from '..';

@ObjectType('Order')
@Entity({name: 'order'})
@FilterableConnection('line', () => OrderLine, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, relationName: 'line'})
@Relation('user', () => User, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, relationName: 'user'})
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
    totalPrice: number;

    @FilterableField()
    @Column({type: 'text'})
    address: string

    @OneToMany(() => OrderLine, item => item.order)
    line: OrderLine[]

    @ManyToOne(() => User, user => user.order)
    user: User

}
