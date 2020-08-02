import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {FilterableField} from '@nestjs-query/query-graphql';
import {ID} from '@nestjs/graphql';
import {DeepPartial} from '../../common';

export abstract class GridIronEntity {
    protected constructor(input?: DeepPartial<GridIronEntity>) {
        if (input) {
            for (const [key, value] of Object.entries(input)) {
                (this as any)[key] = value
            }
        }
    }
}
