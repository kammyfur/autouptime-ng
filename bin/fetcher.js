const http = require('http');
const https = require('https');
const fs = require('fs');
const jsftp = require("jsftp");
const percent = require("./percentages.js");

log("Connecting to FTP... (asynchronous)")
const ftp = new jsftp({
    host: config.ftp.server,
    port: config.ftp.port,
    user: config.ftp.credentials.username,
    pass: config.ftp.credentials.password
});
log("Connected to FTP!")

log("Setup FTP interval");
setInterval(() => {
    ftp.put(fs.readFileSync("./output.json"), config.ftp.filename, err => {
        if (!err) {
            log("Uploaded to FTP successfully")
        } else {
            log("Cannot upload to FTP")
        }
    });
}, config.ftp.refresh * 1000)

module.exports = () => {
    log("Initied new output file");
    output = [ { maintenance: config.maintenance, maintenanceReason: config.maintenanceReason } ];
    log("Fetching websites");
    config.websites.forEach((element, index) => {
        if (false) {} else {
            log("Running for website");
            log("Running for " + element.dns + " (site #" + (index + 1) + ")")
            RequestArguments = {
                hostname: element.dns,
                path: element.root,
                headers: { 'User-Agent': config.ua },
                timeout: element.timeout.ping
            };
            if (element.type == "http") {
                http.get(RequestArguments, (resp) => {

                    let data = '';
                    resp.setTimeout(element.timeout.request)
                
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                
                    resp.on('end', () => {
                        log("Code " + resp.statusCode);
                        if (resp.statusCode == 200) {
                            log("Server response ok, status is 0");
                            output.push({
                                name: element.commonName,
                                server: element.serverName,
                                domain: element.dns,
                                status: 0,
                                message: "Operational — Code " + resp.statusCode,
                                uptime: percent(0, element.serverName)
                            })
                            log("Writing output to file...");
                            fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                            log("Output wrote to 'output.json'!");
                        } else {
                            log("4xx or 5xx status code, status is 2")
                            output.push({
                                name: element.commonName,
                                server: element.serverName,
                                domain: element.dns,
                                status: 2,
                                message: "Error " + resp.statusCode,
                                uptime: percent(2, element.serverName)
                            })
                            log("Writing output to file...");
                            fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                            log("Output wrote to 'output.json'!");
                        }
                    });
                
                    resp.on('timeout', () => {
                        log("Connection timed out, status is 1");
                        output.push({
                            name: element.commonName,
                            server: element.serverName,
                            domain: element.dns,
                            status: 1,
                            message: "Connection timed out",
                            uptime: percent(1, element.serverName)
                        })
                        log("Writing output to file...");
                        fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                        log("Output wrote to 'output.json'!");
                    });

                }).on("error", (err) => {
                    log("Error from website, status is 2");
                    output.push({
                        name: element.commonName,
                        server: element.serverName,
                        domain: element.dns,
                        status: 2,
                        message: err.message,
                        uptime: percent(2, element.serverName)
                    })
                    log("Writing output to file...");
                    fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                    log("Output wrote to 'output.json'!");
                });
            } else if (element.type == "https") {
                https.get(RequestArguments, (resp) => {

                    let data = '';
                    resp.setTimeout(element.timeout.request)
                
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                
                    resp.on('end', () => {
                        log("Code " + resp.statusCode);
                        if (resp.statusCode == 200) {
                            log("Server response ok, status is 0");
                            output.push({
                                name: element.commonName,
                                server: element.serverName,
                                domain: element.dns,
                                status: 0,
                                message: "Operational — Code " + resp.statusCode,
                                uptime: percent(0, element.serverName)
                            })
                            log("Writing output to file...");
                            fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                            log("Output wrote to 'output.json'!");
                        } else {
                            log("4xx or 5xx status code, status is 2")
                            output.push({
                                name: element.commonName,
                                server: element.serverName,
                                domain: element.dns,
                                status: 2,
                                message: "Error " + resp.statusCode,
                                uptime: percent(2, element.serverName)
                            })
                            log("Writing output to file...");
                            fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                            log("Output wrote to 'output.json'!");
                        }
                    });
                
                    resp.on('timeout', () => {
                        log("Connection timed out, status is 1");
                        output.push({
                            name: element.commonName,
                            server: element.serverName,
                            domain: element.dns,
                            status: 1,
                            message: "Connection timed out",
                            uptime: percent(1, element.serverName)
                        })
                        log("Writing output to file...");
                        fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                        log("Output wrote to 'output.json'!");
                    });

                }).on("error", (err) => {
                    log("Error from website, status is 2");
                    output.push({
                        name: element.commonName,
                        server: element.serverName,
                        domain: element.dns,
                        status: 2,
                        message: err.message,
                        uptime: percent(2, element.serverName)
                    })
                    log("Writing output to file...");
                    fs.writeFileSync("./output.json", JSON.stringify(output, null, 4))
                    log("Output wrote to 'output.json'!");
                });
            } else {
                log("Cannot fetch websites: invalid type on website #" + (index + 1))
            }
        }
    })
}
