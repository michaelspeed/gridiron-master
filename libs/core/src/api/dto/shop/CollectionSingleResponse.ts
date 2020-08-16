import {Field, ObjectType} from "@nestjs/graphql";
import {Collection, FacetValue} from "../../../entity";

@ObjectType()
export class CollectionSingleResponse {
    @Field(() => Collection)
    collection: Collection

    @Field(() => [FacetValue])
    facetValues: FacetValue[]
}
