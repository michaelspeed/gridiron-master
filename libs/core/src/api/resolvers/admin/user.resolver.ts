import {Context, Query, Resolver} from '@nestjs/graphql';
import {UserService} from '../../../service';
import {TaxRate, User} from '../../../entity';
import {CRUDResolver, PagingStrategies} from "@nestjs-query/query-graphql";
import {InjectQueryService, QueryService} from "@nestjs-query/core";

@Resolver(() => User)
export class UserResolver extends CRUDResolver(User, {
    pagingStrategy: PagingStrategies.OFFSET,
    enableAggregate: true,
    aggregate: {
        enabled: true
    },
    enableSubscriptions: true,
    create: {disabled: true},
    update: {disabled: true}
}){
    constructor(
        @InjectQueryService(User) readonly service: QueryService<User>,
        private readonly userService: UserService
    ) {
        super(service)
    }

    @Query(() => User)
    async GetCurrentUser(
        @Context() context
    ): Promise<User> {
        return new Promise(async (resolve, reject) => {
            const auth = context.req.headers.authorization;
            const token = auth.split(' ')[1];
            const user = await this.userService.GetCurrentUser(token)
            resolve(user)
        })
    }
}
