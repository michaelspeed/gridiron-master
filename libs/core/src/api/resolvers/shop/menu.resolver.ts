import {Query, Resolver} from '@nestjs/graphql';
import {Collection} from '../../../entity';
import {MenuService} from '../../../service';

@Resolver(of => Collection)
export class MenuResolver {
    constructor(
        private readonly menuService: MenuService
    ) {
    }

    @Query(() => [Collection])
    async GetMenu(): Promise<Collection[]> {
        return this.menuService.GetCollectionTree()
    }
}
