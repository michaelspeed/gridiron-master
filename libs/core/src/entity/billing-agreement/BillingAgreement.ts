import {GridIronEntity} from '../../entity/base/base.entity';
import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Connection, FilterableField, Relation} from '@nestjs-query/query-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {BillingAgreementEnum, BillingAgreementState} from '../../enums';
import {BillingAgreementRequest, Collection, Store} from '../../entity';

registerEnumType(BillingAgreementEnum, {
    name: 'BillingAgreementEnum'
})

registerEnumType(BillingAgreementState, {
    name: 'BillingAgreementState'
})

@ObjectType('BillingAgreement')
@Entity('billing-agreement')
@Relation('collection', () => Collection, {nullable: true})
@Relation('store', () => Store)
@Connection('request', () => BillingAgreementRequest)
export class BillingAgreement extends BaseEntity {

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
    @Column({default: 0, type: 'float'})
    value: number

    @Field(() => BillingAgreementEnum)
    @Column({type: 'enum', enum: BillingAgreementEnum})
    type: BillingAgreementEnum

    @Field(() => BillingAgreementState)
    @Column({type: 'enum', enum: BillingAgreementState})
    state: BillingAgreementState

    @Field(() => Collection, {nullable: true})
    @ManyToOne(type1 => Collection, collect => collect.agreements)
    collection: Collection

    @Field(() => Store)
    @ManyToOne(type1 => Store, store => store.agreement)
    store: Store

    @Field(() => [BillingAgreementRequest])
    @OneToMany(type1 => BillingAgreementRequest, request => request.agreement)
    request: BillingAgreementRequest[]
}
