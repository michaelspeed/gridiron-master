import {Field, ObjectType} from "@nestjs/graphql";
import {User} from "../../../entity";

@ObjectType()
export class UserResponse {
    @Field(() => User)
    user: User

    @Field()
    token: string
}
