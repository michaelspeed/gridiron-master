import {Controller, Get} from "@nestjs/common";

@Controller()
export class DefaultController {
    @Get()
    public getHello() {
        return 'GetHello'
    }
}
