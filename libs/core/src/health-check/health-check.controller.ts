import {Controller, Get} from '@nestjs/common';
import {HEALTH_CHECK_ROUTE} from './constants';
import {
    DiskHealthIndicator,
    DNSHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
    TypeOrmHealthIndicator
} from '@nestjs/terminus';
import {HealthCheckRegistryService} from './health-check-registry.service';

@Controller(HEALTH_CHECK_ROUTE)
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private dns: DNSHealthIndicator,
        private healthCheckRegistryService: HealthCheckRegistryService,
        private db: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            async () => this.dns.pingCheck('google', 'https://www.google.com/'),
            async () => this.db.pingCheck('database', {timeout: 300}),
            async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
            async () => this.disk.checkStorage('storage', { threshold: 250 * 1024 * 1024 * 1024, path: '/' }),
        ])
    }
}
