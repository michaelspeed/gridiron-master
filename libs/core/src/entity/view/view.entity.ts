import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {FilterableField} from '@nestjs-query/query-graphql';
import {ID, ObjectType} from '@nestjs/graphql';
import {ProductVariant, User} from '..';

@ObjectType('View')
@Entity({name: 'view'})
export class View extends BaseEntity {

    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.view)
    user: User

    @ManyToOne(type => ProductVariant, prv => prv.view)
    variant: ProductVariant
}
