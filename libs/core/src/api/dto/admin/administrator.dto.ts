import {Field, ObjectType} from '@nestjs/graphql';
import {Store, User} from '../../../entity';

export enum AdministratorResponseType {
    BASIC = "BASIC",
    ADMIN = "ADMIN",
    VENDOR = "VENDOR",
    BOTH = "BOTH"
}

@ObjectType()
export class AdministratorDto {
    @Field(() => User)
    user: User

    @Field()
    token: string

    @Field({nullable: true})
    store: Store

    @Field(() => AdministratorResponseType)
    type: AdministratorResponseType
}
