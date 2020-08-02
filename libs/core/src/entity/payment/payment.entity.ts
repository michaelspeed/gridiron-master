import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField} from '@nestjs-query/query-graphql';

@ObjectType('Payment')
@Entity({name: 'payment'})
export class Payment extends BaseEntity {
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
    method: string;

    @FilterableField()
    @Column()
    amount: number;

    @FilterableField()
    @Column({ nullable: true })
    errorMessage: string;

    @FilterableField()
    @Column({ nullable: true })
    transactionId: string;

    // @Column('simple-json') metadata: PaymentMetadata;
    // @Column('varchar') state: PaymentState;
}
