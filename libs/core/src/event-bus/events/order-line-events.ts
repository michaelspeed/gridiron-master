import {GridIronEvents} from "../";
import {OrderLine} from "../../entity";
import {OrderStageType} from "../../enums/OrderStageType";

export class OrderLineEvents extends GridIronEvents {
    constructor(
        public orderLine: OrderLine,
        public type: OrderStageType
    ) {
        super();
    }
}
