import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Connection, FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {Address, Administrator, Cart, Delivery, Order, Vendor, View} from '..';

@ObjectType('User')
@Relation('administrator', () => Administrator, {nullable: true})
@Relation('vendor', () => Vendor, {nullable: true})
@Connection('address', () => Address, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, nullable: true, relationName: 'address'})
@Connection('order', () => Order, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, nullable: true, relationName: 'order'})
@Entity({name: 'user'})
export class User extends BaseEntity {

    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @Index()
    @FilterableField()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @FilterableField()
    @Column({ default: false })
    verified: boolean;

    @FilterableField({nullable: true})
    @Column({ type: 'varchar', nullable: true })
    verificationToken: string;

    @FilterableField({nullable: true})
    @Column({ type: 'varchar', nullable: true })
    passwordResetToken: string;

    @FilterableField({nullable: true})
    @Column({ type: 'varchar', nullable: true })
    identifierChangeToken: string;

    @FilterableField({nullable: true})
    @Column({ type: 'varchar', nullable: true })
    pendingIdentifier: string;

    @FilterableField({nullable: true})
    @Column({ nullable: true, type: "date" })
    lastLogin: Date;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    firstName: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    lastName: string;

    @Index()
    @FilterableField()
    @Column()
    phoneNumber: string;

    @Field(() => Administrator)
    @OneToOne(type => Administrator, ad => ad.user)
    administrator: Administrator;

    @Field(() => Vendor)
    @OneToOne(type => Vendor, vendor => vendor.user)
    vendor: Vendor

    @Field(() => Delivery)
    @OneToOne(type => Delivery, delivery => delivery.user)
    delivery: Delivery

    @Field(() => Cart)
    @OneToOne(() => Cart, cart => cart.user)
    cart: Cart

    @Field(() => [View])
    @OneToMany(() => View, view => view.user)
    view: View[]

    @Field(() => [Address], {nullable: true})
    @OneToMany(() => Address, add => add.user)
    address: Address[]

    @Field(() => [Order], {nullable: true})
    @OneToMany(() => Order, order => order.user)
    order: Order[]
}
