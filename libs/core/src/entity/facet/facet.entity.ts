import {BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {Connection, FilterableField, Relation} from '@nestjs-query/query-graphql';
import {FacetValue, Product} from '../';

@ObjectType('Facet')
@Entity({name: 'facet'})
@Connection('values', () => FacetValue)
@Connection('product', () => Product)
export class Facet extends BaseEntity {

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
    @Column({ default: false })
    isPrivate: boolean;

    @FilterableField()
    @Column({ unique: true })
    code: string;

    @OneToMany(type => FacetValue, val => val.facet)
    values: FacetValue[]

}
