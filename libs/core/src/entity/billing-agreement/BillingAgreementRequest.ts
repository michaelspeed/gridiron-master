import {Field, ID, ObjectType} from '@nestjs/graphql';
import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {FilterableField, Relation} from '@nestjs-query/query-graphql';
import {BillingAgreement} from '..';
import {BillingAgreementState} from '../../enums';

@ObjectType('BillingAgreementRequest')
@Entity('billing-agreement-request')
@Relation('agreement', () => BillingAgreement)
export class BillingAgreementRequest extends BaseEntity {

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

    @Field(() => BillingAgreementState)
    @Column({type: 'enum', enum: BillingAgreementState, default: BillingAgreementState.PENDING})
    state: BillingAgreementState

    @ManyToOne(type => BillingAgreement, agreement => agreement.request)
    agreement: BillingAgreement
}
