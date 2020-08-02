import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType('FocalPoint')
export class FocalPoint {
    @Field()
    x: number

    @Field()
    y: number
}
