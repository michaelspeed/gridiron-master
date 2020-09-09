import {BaseEntity, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {FilterableField} from '@nestjs-query/query-graphql';
import {ID, ObjectType} from '@nestjs/graphql';
import {CartItem, User} from '../';

@ObjectType('Cart')
@Entity({name: 'cart'})
export class Cart extends BaseEntity {

    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(type => CartItem, item => item.cart)
    items: CartItem[]

    @OneToOne(type => User, user => user.cart)
    @JoinColumn()
    user: User

}
