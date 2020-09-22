import {DEF_CONFIG} from './default-config';
import {BootstrapWorker} from "@gridiron/core";

DEF_CONFIG.dbConnectionOptions = {...DEF_CONFIG.dbConnectionOptions, synchronize: false}

BootstrapWorker(DEF_CONFIG).catch(error => {
    console.log(error)
})
