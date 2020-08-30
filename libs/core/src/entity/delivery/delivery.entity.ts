import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {FilterableConnection, FilterableField, PagingStrategies, Relation} from "@nestjs-query/query-graphql";
import {Administrator, DeliverySignIn, User} from "..";

@ObjectType('Delivery')
@Entity({name: 'delivery'})
@Relation('user', () => User, {nullable: true})
@FilterableConnection('signIn', () => DeliverySignIn, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true, nullable: true, relationName: 'signIn'})
export class Delivery extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => User)
    @OneToOne(type => User, user => user.delivery)
    user: User

    @Field(() => [DeliverySignIn])
    @OneToMany(() => DeliverySignIn, signIn => signIn.delivery)
    signIn: DeliverySignIn[]
}
