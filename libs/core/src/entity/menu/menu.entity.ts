import {ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn} from 'typeorm';
import {Connection, FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {MenuBuilderTypes} from '../../enums/MenuBuilderTypes';

registerEnumType(MenuBuilderTypes, {
    name: 'MenuBuilderTypes'
})

@ObjectType('Menu')
@Entity({name: 'menu'})
@Tree("nested-set")
@Connection('children', () => Menu, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Relation('parent', () => Menu, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class Menu extends BaseEntity {
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
    title: string;

    @FilterableField()
    @Column({nullable: true})
    targetId: string;

    @FilterableField()
    @Column({enum: MenuBuilderTypes, type: 'enum'})
    target: MenuBuilderTypes;

    @TreeChildren()
    children: Menu[]

    @TreeParent()
    parent: Menu
}
