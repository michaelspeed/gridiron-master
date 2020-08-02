import {Controller, Get} from '@nestjs/common';
import {HEALTH_CHECK_ROUTE} from './constants';
import {DNSHealthIndicator, HealthCheck, HealthCheckService} from '@nestjs/terminus';
import {HealthCheckRegistryService} from './health-check-registry.service';

@Controller(HEALTH_CHECK_ROUTE)
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private dns: DNSHealthIndicator,
        private healthCheckRegistryService: HealthCheckRegistryService
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check(this.healthCheckRegistryService.healthIndicatorFunctions)
    }
}
