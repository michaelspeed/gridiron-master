import {ID, ObjectType} from "@nestjs/graphql";
import {BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {FilterableField} from "@nestjs-query/query-graphql";

@ObjectType('DeliveryPool')
@Entity({name: 'deliverypool'})
export class DeliveryPool extends BaseEntity {
    @FilterableField(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @FilterableField()
    @CreateDateColumn()
    createdAt: Date;

    @FilterableField()
    @UpdateDateColumn()
    updatedAt: Date;
}
