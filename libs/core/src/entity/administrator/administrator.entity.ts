import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {User} from '..';
import {FilterableField, PagingStrategies, Relation} from '@nestjs-query/query-graphql';
import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {AdministratorEnum} from '../../enums';

registerEnumType(AdministratorEnum, {
    name: 'AdministratorEnum'
})

@ObjectType('Administrator')
@Relation('user', () => User, {pagingStrategy: PagingStrategies.OFFSET, enableAggregate: true})
@Entity({name: 'administrator'})
export class Administrator extends BaseEntity {

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
    firstName: string;

    @FilterableField()
    @Column({nullable: true})
    lastName: string | null;

    @FilterableField()
    @Column({ unique: true })
    emailAddress: string;

    @Field(() => AdministratorEnum)
    @Column({default: AdministratorEnum.SUPERADMIN, type:'enum', enum: AdministratorEnum})
    type: AdministratorEnum

    @Field(() => User)
    @OneToOne(type => User, us => us.administrator)
    @JoinColumn()
    user: User;
}
