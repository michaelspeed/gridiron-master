import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {ProductVariant, TaxRate} from '../';

@ObjectType('ProductVariantPrice')
@Entity({name: 'productVariantPrice'})
@Relation('variant', () => ProductVariant, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('tax', () => TaxRate, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
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

    @ManyToOne(type => TaxRate, tax => tax.variants)
    tax: TaxRate

    @OneToOne(type => ProductVariant, variant => variant.price)
    variant: ProductVariant
    
}
