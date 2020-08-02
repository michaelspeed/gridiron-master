import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {Connection, FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Asset, Collection, Facet, FacetValue, ProductAsset, ProductOptionGroup, ProductVariant} from '../';

@ObjectType('Product')
@Entity({name: 'product'})
@Connection('assets', () => ProductAsset)
@Connection('variants', () => ProductVariant)
@Connection('facets', () => FacetValue)
@Connection('options', () => ProductOptionGroup)
@Relation('featuredAsset', () => Asset)
@Relation('collection', () => Collection, {nullable: true})
export class Product extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: true })
    enabled: boolean;

    @FilterableField()
    @Column()
    productName: string;

    @FilterableField()
    @Column()
    slug: string;

    @FilterableField()
    @Column('text')
    description: string;

    @ManyToOne(type => Collection, col => col.products)
    collection: Collection

    @OneToMany(type => ProductOptionGroup, optGroup => optGroup.product)
    options: ProductOptionGroup[]

    @ManyToOne(type => Asset, asset => asset.featured)
    featuredAsset: Asset

    @ManyToMany(type => FacetValue, facet => facet.product)
    @JoinTable()
    facets: FacetValue[]

    @OneToMany(type => ProductAsset, prasset => prasset.product)
    assets: ProductAsset[]

    @OneToMany(type => ProductVariant, variant => variant.product)
    variants: ProductVariant[]
}
