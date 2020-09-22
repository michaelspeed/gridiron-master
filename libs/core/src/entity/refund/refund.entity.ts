import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField} from '@nestjs-query/query-graphql';

@ObjectType('Refund')
@Entity({name: 'refund'})
export class Refund extends BaseEntity {
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
    items: number;

    @FilterableField()
    @Column() 
    shipping: number;

    @FilterableField()
    @Column() 
    adjustment: number;

    @FilterableField()
    @Column() 
    total: number;

    @FilterableField()
    @Column() 
    method: string;

    @FilterableField()
    @Column({ nullable: true }) 
    reason: string;

    @FilterableField()
    @Column({ nullable: true }) 
    transactionId: string;

    
}
