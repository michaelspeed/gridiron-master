import {Field, ObjectType} from '@nestjs/graphql';
import {Store, User} from '../../../entity';

@ObjectType()
export class AdministratorDto {
    @Field(() => User)
    user: User

    @Field()
    token: string

    @Field({nullable: true})
    store: Store
}
