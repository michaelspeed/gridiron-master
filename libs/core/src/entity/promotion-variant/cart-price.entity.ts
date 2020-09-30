import {ID, ObjectType} from "@nestjs/graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {FilterableField, PagingStrategies, Relation} from "@nestjs-query/query-graphql";
import {PricePromoType} from "@gridiron/core/enums";
import {Collection} from "../../entity";

@ObjectType('CartPriceRules')
@Entity('cart-price')
@Relation('collection', () => Collection, {nullable: true, pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
export class CartPrice extends BaseEntity {

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
    @DeleteDateColumn()
    deletedAt?: Date;

    @FilterableField()
    @Column({type: "enum", enum: PricePromoType, default: PricePromoType.PERCENTAGE})
    priceType: PricePromoType

    @FilterableField()
    @Column()
    value: number

    @OneToOne(() => Collection, collect => collect.cartPrice)
    @JoinColumn()
    collection: Collection
}
