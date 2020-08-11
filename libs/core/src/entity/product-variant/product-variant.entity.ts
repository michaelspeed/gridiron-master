import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {
    Connection,
    FilterableConnection,
    FilterableField,
    PagingStrategies,
    Relation
} from '@nestjs-query/query-graphql';
import {Product, ProductOption, ProductVariantAsset, ProductVariantPrice, ProductVariantSpecifications, Seo, View} from '../';
import {StockKeeping} from '@gridiron/core/entity/stock-movement/stock-keeping.entity';

@ObjectType('ProductVariant')
@Entity({name: 'productVariant'})
@Relation('product', () => Product, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('asset', () => ProductVariantAsset, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Connection('price', () => ProductVariantPrice, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, allowFiltering: false})
@Relation('specs', () => ProductVariantSpecifications, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('seo', () => Seo, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Connection('stock', () => StockKeeping, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class ProductVariant extends BaseEntity {
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
    @Column({ type: Date, nullable: true })
    deletedAt: Date | null;

    @FilterableField()
    @Column({default: 0})
    dum_price: number

    @FilterableField()
    @Column({ default: true })
    enabled: boolean;

    @FilterableField()
    @Column({default: ''})
    sku: string;

    @FilterableField()
    @Column()
    name: string;

    @ManyToOne(type => Product, prod => prod.variants)
    product: Product

    @FilterableField()
    @Column({default: true})
    trackInventory: boolean;

    @OneToOne(type => ProductVariantAsset, prod => prod.variant)
    asset: ProductVariantAsset

    @OneToMany(type => ProductVariantPrice, price => price.price)
    price: ProductVariantPrice[]

    @OneToOne(type => ProductVariantSpecifications, specs => specs.variant)
    @JoinColumn()
    specs: ProductVariantSpecifications

    @OneToMany(type => View, view => view.variant)
    view: View[]

    @OneToOne(type => Seo, seo => seo.variant)
    seo: Seo

    @OneToMany(() => StockKeeping, keeping => keeping.variant)
    stock: StockKeeping[]
}
