import {ID, ObjectType} from "@nestjs/graphql";
import {BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FilterableField} from "@nestjs-query/query-graphql";
import {Cart, ProductVariant, Store} from "..";

@ObjectType('CartItem')
@Entity('catritem')
export class CartItem extends BaseEntity {

    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Cart, cart => cart.items)
    cart: Cart

    @ManyToOne(type => ProductVariant, variant => variant.carts)
    variant: ProductVariant

    @ManyToOne(type => Store, store => store.cart)
    store: Store
}
