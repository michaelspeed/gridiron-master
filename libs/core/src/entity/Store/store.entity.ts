import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Connection, FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {BillingAgreement, Country, StockKeeping, TaxCategory, Vendor, Zone} from '..';

export enum StoreTypeEnum {
    DEFAULT = 'default',
    VENDOR = 'vendor'
}

registerEnumType(StoreTypeEnum, {
    name: 'StoreTypeEnum',
});

@ObjectType('Store')
@Relation('country', () => Country, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Connection('sku', () => StockKeeping, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Entity({name: 'store'})
export class Store extends BaseEntity {
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
    storeName: string;

    @FilterableField()
    @Column()
    phoneNumber: string;

    @FilterableField()
    @Column({ unique: true })
    officialemail: string;

    @ManyToOne(type1 => Zone, zone => zone.stores)
    region: Zone;

    @FilterableField()
    @Column()
    zipcode: string;

    @FilterableField()
    @Column()
    streetAddress1: string;

    @FilterableField()
    @Column()
    streetAddress2: string;

    @FilterableField()
    @Column({default: ''})
    GSTIN: string;

    @FilterableField()
    @Column({default: true})
    singleStore: boolean;

    @FilterableField()
    @Column({default: false})
    rentalStore: boolean;

    @FilterableField()
    @Column({default: false})
    channelMarkets: boolean;

    @Field(() => StoreTypeEnum)
    @Column({enum: StoreTypeEnum, type: "enum", default: StoreTypeEnum.DEFAULT})
    type: StoreTypeEnum

    @ManyToOne(type1 => Country, count => count.stores)
    country: Country

    @OneToMany(type1 => TaxCategory, taxc => taxc.store)
    taxCategory: TaxCategory[]

    @OneToOne(type1 => Vendor, vendor => vendor.store)
    vendor: Vendor

    @OneToMany(type1 => BillingAgreement, agreement => agreement.store)
    agreement: BillingAgreement[]

    @OneToMany(() => StockKeeping, sku => sku.store)
    sku: StockKeeping[]
}
