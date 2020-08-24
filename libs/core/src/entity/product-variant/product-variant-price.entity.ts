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
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, FilterableRelation, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {ProductVariant, Store, TaxRate} from '../';

@ObjectType('ProductVariantPrice')
@Entity({name: 'productVariantPrice'})
@FilterableRelation('variant', () => ProductVariant, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('tax', () => TaxRate, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('store', () => TaxRate, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class ProductVariantPrice extends BaseEntity {

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
    price: number;

    @FilterableField()
    @Column()
    taxIncluded: boolean;

    // @Field(() => TaxRate)
    @ManyToOne(type => TaxRate, tax => tax.variants)
    tax: TaxRate

    // @Field(() => ProductVariant)
    @ManyToOne(type => ProductVariant, variant => variant.price)
    variant: ProductVariant

    // @Field(() => Store, {nullable: true})
    @ManyToOne(type => Store, store => store.prices)
    store: Store
    
}
