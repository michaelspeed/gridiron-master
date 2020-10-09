import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {AssetType} from '../../enums/AssetType';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Connection, FilterableField, PagingStrategies} from '@nestjs-query/query-graphql';
import {FocalPoint} from '../common/FocalPoint';
import {GraphQLJSONObject} from 'graphql-type-json';
import {AssetsFolder} from './assets-folder.entity';
import {DeepPartial} from '../../common';
import {GridIronEntity} from '../base/base.entity';
import {Product, ProductAsset, ProductVariant} from '../';

@ObjectType('Asset')
@Entity({name: 'Asset'})
@Connection('productAsset', () => ProductAsset, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, relationName: 'productAsset'})
@Connection('featured', () => Product, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, relationName: 'featured'})
export class Asset extends GridIronEntity {

    constructor(input?: DeepPartial<Asset>) {
        super(input);
    }

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
    @DeleteDateColumn()
    deletedAt?: Date;

    @FilterableField()
    @Column() 
    name: string;

    @FilterableField()
    @Column('varchar') 
    type: AssetType;

    @FilterableField()
    @Column() 
    mimeType: string;

    @FilterableField()
    @Column({ default: 0 }) 
    width: number;

    @FilterableField()
    @Column({ default: 0 }) 
    height: number;

    @FilterableField()
    @Column() 
    fileSize: number;

    @FilterableField()
    @Column() 
    source: string;

    @FilterableField()
    @Column() 
    preview: string;

    @OneToMany(type1 => ProductVariant, vr => vr.asset)
    variantAsset: ProductVariant[]

    @OneToMany(type1 => Product, pr => pr.featuredAsset)
    featured: Product[]

    @OneToMany(type1 => ProductAsset, passet => passet.asset)
    productAsset: ProductAsset[]

    @Field(() => GraphQLJSONObject)
    @Column('simple-json', { nullable: true })
    focalPoint?: FocalPoint;

    @ManyToOne(type => AssetsFolder, folder => folder.assets)
    folder: AssetsFolder
}
