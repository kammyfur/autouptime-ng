const version = 1;
process = process

global.config = require('./config.json');
global.log = require('./bin/logger.js');
const fetch = require('./bin/fetcher.js');
log("Loaded modules");

if (version != config.version) {
    log("PANIC: Invalid config version — run migration binary or update 'version' value in config.json");
    process.exit()
}

setInterval(fetch, config.refresh * 1000)
log("Defined interval, now waiting");