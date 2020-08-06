import {BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {ID, ObjectType} from '@nestjs/graphql';
import {Asset, Product} from '../';

@ObjectType('ProductAsset')
@Entity('product-asset')
@Relation('product', () => Product, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('asset', () => Asset, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class ProductAsset extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Product, prod => prod.assets)
    product: Product

    @ManyToOne(type => Asset, asset => asset.productAsset)
    asset: Asset
}
