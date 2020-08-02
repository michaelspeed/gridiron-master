import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Administrator, Cart, Vendor, View} from '..';

@ObjectType('User')
@Relation('administrator', () => Administrator)
@Relation('vendor', () => Vendor)
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

    @FilterableField()
    @Column({ type: 'varchar', nullable: true })
    verificationToken: string | null;

    @FilterableField()
    @Column({ type: 'varchar', nullable: true })
    passwordResetToken: string | null;

    @FilterableField()
    @Column({ type: 'varchar', nullable: true })
    identifierChangeToken: string | null;

    @FilterableField({nullable: true})
    @Column({ type: 'varchar', nullable: true })
    pendingIdentifier: string | null;

    @FilterableField({nullable: true})
    @Column({ nullable: true })
    lastLogin: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    firstName: string | null;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    lastName: string | null;

    @FilterableField()
    @Column()
    phoneNumber: string;

    @FilterableField({nullable: true})
    @Column({nullable: true})
    address?: string;

    @Field(() => Administrator)
    @OneToOne(type => Administrator, ad => ad.user)
    administrator: Administrator;

    @Field(() => Vendor)
    @OneToOne(type => Vendor, vendor => vendor.user)
    vendor: Vendor

    @OneToOne(() => Cart, cart => cart.user)
    cart: Cart

    @OneToMany(() => View, view => view.user)
    view: View[]
}
