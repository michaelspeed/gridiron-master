import {Context, Query, Resolver} from '@nestjs/graphql';
import {UserService} from '../../../service';
import {User} from '../../../entity';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

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
