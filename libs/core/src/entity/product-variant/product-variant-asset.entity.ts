import {BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Asset, ProductVariant} from '../';

@ObjectType('ProductVariantAsset')
@Entity({name: 'productVariantAsset'})
@Relation('variant', () => ProductVariant)
@Relation('asset', () => Asset)
export class ProductVariantAsset extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Asset, asset => asset.variantAsset)
    asset: Asset

    @OneToOne(type => ProductVariant, variant => variant.asset)
    @JoinColumn()
    variant: ProductVariant
}
