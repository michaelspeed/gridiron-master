import {BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {Connection, FilterableField, Relation} from '@nestjs-query/query-graphql';
import {ProductOptionGroup, ProductVariant} from '../';

@ObjectType('ProductOption')
@Entity({name: 'productOption'})
@Connection('variant', () => ProductVariant)
@Relation('group', () => ProductOptionGroup)
export class ProductOption extends BaseEntity {
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
    name: string

    @FilterableField()
    @Column()
    code: string;

    @ManyToOne(type => ProductOptionGroup, group => group.options)
    group: ProductOptionGroup

}
