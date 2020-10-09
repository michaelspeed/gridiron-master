import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class DataSource {
    @Field()
    sum: number

    @Field()
    amount: number
}

@ObjectType()
export class ProdDataSource {
    @Field()
    sum: number
}

@ObjectType()
export class StatisticeDto {
    @Field(() => [String])
    labels: string[]
    @Field(() => [DataSource])
    datasource: DataSource[]
}


@ObjectType()
export class StatisticeProdDto {
    @Field(() => [String])
    labels: string[]
    @Field(() => [ProdDataSource])
    datasource: ProdDataSource[]
}
