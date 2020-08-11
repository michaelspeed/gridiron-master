import {Field, ID, ObjectType} from "@nestjs/graphql";
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {FilterableField} from "@nestjs-query/query-graphql";
import {User} from "..";

@ObjectType('Delivery')
@Entity({name: 'delivery'})
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
    @JoinColumn()
    user: User
}
