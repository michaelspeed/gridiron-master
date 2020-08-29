import {Args, Context, ID, Mutation, Resolver} from "@nestjs/graphql";
import {Delivery} from "../../../entity";
import {DeliveryService} from "../../../service";
import {JwtService} from "@nestjs/jwt";

@Resolver(() => Delivery)
export class DeliveryResolver {
    constructor(
        private readonly deliveryService: DeliveryService,
        private readonly jwtService: JwtService,
    ) {}

    @Mutation(() => Delivery)
    async SetNewDeliveryGuy(
        @Args('userId', {type: () => ID}) userId: string,
        @Context() context
    ): Promise<Delivery> {
        const auth = context.req.headers.authorization;
        const token = auth.split(' ')[1];
        const admin: any = this.jwtService.decode(token)
        return this.deliveryService.SetNewDeliveryGuy(userId, admin.userId)
    }
}
