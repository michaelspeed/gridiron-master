import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {User} from '../user/user.entity';
import {Store, VendorLicense} from '../';

@ObjectType('Vendor')
@Entity({name: 'vendor'})
@Relation('user', () => User, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('license', () => VendorLicense, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('store', () => Store, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class Vendor extends BaseEntity {
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
    vendorName: string;

    @FilterableField()
    @Column()
    phoneNumber: string;

    @FilterableField()
    @Column({ unique: true })
    email: string;

    @OneToOne(type => Store, store => store.vendor)
    @JoinColumn()
    store: Store

    @OneToOne(type => User, user => user.vendor)
    @JoinColumn()
    user: User

    @OneToOne(type => VendorLicense)
    @JoinColumn()
    license: VendorLicense

}
