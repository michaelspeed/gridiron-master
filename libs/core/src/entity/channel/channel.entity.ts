import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Zone} from '..';
import {LanguageCode} from '../../enums/LanguageCode';
import {CurrencyCode} from '../../enums/CurrencyCode';
import {ID, ObjectType} from '@nestjs/graphql';
import {FilterableField} from '@nestjs-query/query-graphql';
import {DeepPartial} from '@gridiron/core/common';

@ObjectType('Channel')
@Entity({name: 'channel'})
export class Channel extends BaseEntity {

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
    @Column({ unique: true })
    code: string;

    @FilterableField()
    @Column({ unique: true })
    token: string;

    @FilterableField()
    @Column('varchar') 
    defaultLanguageCode: LanguageCode;

    @ManyToOne(type => Zone)
    defaultTaxZone: Zone;

    @ManyToOne(type => Zone)
    defaultShippingZone: Zone;

    @FilterableField()
    @Column('varchar')
    currencyCode: CurrencyCode;

    @FilterableField()
    @Column() 
    pricesIncludeTax: boolean;
}
