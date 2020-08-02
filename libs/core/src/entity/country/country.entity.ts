import {BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ID, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Connection, FilterableField} from '@nestjs-query/query-graphql';
import {Store, Zone} from '..';

export enum CountryZone {
    ASIA = 'ASIA',
    EUROPE = 'EUROPE',
    AFRICA = 'AFRICA',
    'OCEANIA' = 'OCEANIA',
    'AMERICAS' = 'AMERICAS'
}

registerEnumType(CountryZone, {
    name: 'CountryZone'
})

@ObjectType('Country')
@Entity({name: 'country'})
@Connection('zone', () => Zone)
export class Country extends BaseEntity {
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
    code: string;

    @FilterableField()
    @Column()
    name: string;

    @FilterableField()
    @Column()
    enabled: boolean;

    @ManyToMany(type => Zone, zone => zone.members)
    zone: Zone[];

    @OneToMany(type => Store, store => store.country)
    stores: Store[]
}
