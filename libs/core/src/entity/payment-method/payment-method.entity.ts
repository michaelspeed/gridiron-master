import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField} from '@nestjs-query/query-graphql';
import {Payment} from "..";

@ObjectType('PaymentMethod')
@Entity({name: 'paymentMethod'})
export class PaymentMethod extends BaseEntity {
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
    api: string;

    @FilterableField()
    @Column()
    secretKey: string;

    @FilterableField()
    @Column({default: true})
    enabled: boolean;

    @OneToMany(() => Payment, payment => payment.method)
    transactions: Payment[]

    // @Column('simple-json') configArgs: ConfigArg[];

}
