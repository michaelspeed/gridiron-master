import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class DeliveryStrandedCount {
    @Field()
    count: number
}
