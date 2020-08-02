import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField} from '@nestjs-query/query-graphql';

@ObjectType('HistroyEntry')
@Entity({name: 'histroyEntry'})
export class HistoryEntry extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    // @Column({ nullable: false, type: 'varchar' })
    // readonly type: HistoryEntryType;

    @FilterableField()
    @Column()
    isPublic: boolean;

    @Column('simple-json')
    data: any;
    
}
