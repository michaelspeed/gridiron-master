import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class OrderLineDto {
    @Field()
    priceId: string

    @Field()
    quantity: number
}
