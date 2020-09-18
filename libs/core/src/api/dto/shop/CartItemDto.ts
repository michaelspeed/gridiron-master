import {Field, InputType, ObjectType} from "@nestjs/graphql";

@InputType()
export class CartItemDto {
    @Field()
    priceId: string

    @Field()
    quantity: number
}
