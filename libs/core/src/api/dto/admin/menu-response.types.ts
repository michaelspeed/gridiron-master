import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class MenuResponseTypes {

    @Field()
    menu: string

}
