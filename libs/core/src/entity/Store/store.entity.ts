import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {
    Connection,
    FilterableConnection,
    FilterableField,
    PagingStrategies,
    Relation
} from '@nestjs-query/query-graphql';
import {BillingAgreement, Country, OrderLine, ProductVariantPrice, StockKeeping, TaxCategory, Vendor, Zone} from '..';
import {StoreBalance} from "./storeBalance.entity";
import {Settlements} from "../settlement/settlement.entity";

export enum StoreTypeEnum {
    DEFAULT = 'default',
    VENDOR = 'vendor'
}

registerEnumType(StoreTypeEnum, {
    name: 'StoreTypeEnum',
});

@ObjectType('Store')
@Relation('country', () => Country, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('balance', () => StoreBalance, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, nullable: true})
@Connection('sku', () => StockKeeping, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Connection('settlement', () => Settlements, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Connection('prices', () => Settlements, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@FilterableConnection('line', () => OrderLine, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
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

    @Field(() => Vendor, {nullable: true})
    @OneToOne(type1 => Vendor, vendor => vendor.store)
    vendor: Vendor

    @OneToOne(type1 => StoreBalance, balance => balance.store)
    @JoinColumn()
    balance: StoreBalance

    @OneToMany(type1 => BillingAgreement, agreement => agreement.store)
    agreement: BillingAgreement[]

    @OneToMany(() => StockKeeping, sku => sku.store)
    sku: StockKeeping[]

    @OneToMany(() => Settlements, settle => settle.store)
    settlement: Settlements[]

    @OneToMany(() => ProductVariantPrice, price => price.store)
    prices: ProductVariantPrice[]

    @OneToMany(() => OrderLine, line => line.store)
    line: OrderLine[]
}
