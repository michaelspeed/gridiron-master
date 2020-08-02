import {BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {Connection, FilterableField, Relation} from '@nestjs-query/query-graphql';
import {Facet} from '../facet/facet.entity';
import {Product} from '../';

@ObjectType('FacetValue')
@Entity({name: 'facetValue'})
@Relation('facet', () => Facet)
@Connection('product', () => Product)
export class FacetValue extends BaseEntity {
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
    code: string;

    @ManyToMany(type => Product, prod => prod.facets)
    product: Product[]

    @ManyToOne(type => Facet, fac => fac.values)
    facet: Facet
    
}
