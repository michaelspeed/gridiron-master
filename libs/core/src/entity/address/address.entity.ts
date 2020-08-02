import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Country} from '../country/country.entity';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField} from '@nestjs-query/query-graphql';

@ObjectType('Address')
@Entity({name: 'address'})
export class Address extends BaseEntity {

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
    @Column({ default: '' })
    fullName: string;

    @FilterableField()
    @Column({ default: '' })
    company: string;

    @FilterableField()
    @Column()
    streetLine1: string;

    @FilterableField()
    @Column({ default: '' })
    streetLine2: string;

    @FilterableField()
    @Column({ default: '' })
    city: string;

    @FilterableField()
    @Column({ default: '' })
    province: string;

    @FilterableField()
    @Column({ default: '' })
    postalCode: string;

    @ManyToOne(type => Country)
    country: Country;

    @FilterableField()
    @Column({ default: '' })
    phoneNumber: string;

    @FilterableField()
    @Column({ default: false })
    defaultShippingAddress: boolean;

    @FilterableField()
    @Column({ default: false })
    defaultBillingAddress: boolean;

}
