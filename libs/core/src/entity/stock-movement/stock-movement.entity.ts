import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {StockKeeping, Store} from '..';

@ObjectType('StockMovement')
@Entity({name: 'StockMovement'})
@Relation('keeping', () => StockKeeping)
export class StockMovement extends BaseEntity {
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
    quantity: number;

    @ManyToOne(() => StockKeeping, keeping => keeping.movement)
    keeping: StockKeeping
}
