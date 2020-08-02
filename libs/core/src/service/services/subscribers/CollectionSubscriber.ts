import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from 'typeorm';
import {Collection} from '../../../entity';

@EventSubscriber()
export class CollectionSubscriber implements EntitySubscriberInterface<Collection>{
    listenTo(): Function | string {
        return Collection
    }

    afterInsert(event: InsertEvent<Collection>): Promise<any> | void {

    }
}
