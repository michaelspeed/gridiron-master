import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {Connection, FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Product, ProductOption} from '../';

@ObjectType('ProductOptionGroup')
@Entity({name: 'productOptionGroup'})
@Connection('options', () => ProductOption)
@Relation('product', () => Product)
export class ProductOptionGroup extends BaseEntity {
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
    name: string;

    @FilterableField()
    @Column()
    code: string;

    @ManyToOne(type => Product, prod => prod.options)
    product: Product

    @OneToMany(type => ProductOption, options => options.group)
    options: ProductOption[]
}
