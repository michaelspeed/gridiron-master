import {ID, ObjectType} from '@nestjs/graphql';
import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Vendor, VendorPlans} from '../';

@ObjectType('VendorLicense')
@Entity({name: 'vendor-license'})
@Relation('vendor', () => Vendor)
export class VendorLicense extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @FilterableField()
    @Column()
    tenureStart: Date;

    @FilterableField()
    @Column()
    tenureEnd: Date;

    @OneToOne(type => Vendor)
    vendor: Vendor

    @ManyToOne(type => VendorPlans, plan => plan.licences)
    plans: VendorPlans
}
