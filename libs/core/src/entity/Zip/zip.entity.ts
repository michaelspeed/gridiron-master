import {ID, ObjectType} from '@nestjs/graphql';
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';
import {FilterableField} from '@nestjs-query/query-graphql';

@ObjectType('Zip')
@Entity({name: 'zip'})
export class Zip extends BaseEntity {
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
    @Column({default: ''})
    name: string;

    @FilterableField()
    @Column({type: 'text'})
    slug: string;

    @FilterableField()
    @Column({unique: true})
    code: number;
}
