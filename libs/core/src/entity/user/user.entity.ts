import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {Address, Administrator, Cart, Delivery, Vendor, View} from '..';

@ObjectType('User')
@Relation('administrator', () => Administrator, {nullable: true})
@Relation('vendor', () => Vendor, {nullable: true})
@Relation('address', () => Address, {nullable: true})
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

    @FilterableField()
    @Column({ unique: true })
    email: string;

    @Field()
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
    @Column({ nullable: true })
    lastLogin: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    firstName: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    lastName: string;

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

    @OneToOne(() => Cart, cart => cart.user)
    cart: Cart

    @OneToMany(() => View, view => view.user)
    view: View[]

    @OneToMany(() => Address, add => add.user)
    address: Address[]
}
