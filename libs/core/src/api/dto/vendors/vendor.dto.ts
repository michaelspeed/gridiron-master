import {Field, ObjectType} from '@nestjs/graphql';
import {User, Vendor} from '../../../entity';

@ObjectType()
export class VendorDto {
    @Field(() => User)
    user: User

    @Field()
    token: string

    @Field(() => Vendor)
    vendor: Vendor
}
