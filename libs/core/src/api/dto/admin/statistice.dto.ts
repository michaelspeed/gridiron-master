import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class DataSource {
    @Field()
    sum: number

    @Field()
    amount: number
}

@ObjectType()
export class StatisticeDto {
    @Field(() => [String])
    labels: string[]
    @Field(() => [DataSource])
    datasource: DataSource[]
}
