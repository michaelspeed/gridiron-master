import {BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {FilterableField} from '@nestjs-query/query-graphql';
import {ID, ObjectType} from '@nestjs/graphql';
import {User} from '../';

@ObjectType('Cart')
@Entity({name: 'cart'})
export class Cart extends BaseEntity {

    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => User, user => user.cart)
    @JoinColumn()
    user: User

}
