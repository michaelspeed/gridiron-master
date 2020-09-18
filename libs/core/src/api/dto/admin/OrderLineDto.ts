import {Field, InputType, ObjectType} from "@nestjs/graphql";

@InputType()
export class OrderLineDto {
    @Field()
    priceId: string

    @Field()
    quantity: number
}
