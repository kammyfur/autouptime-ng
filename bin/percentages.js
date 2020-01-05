const fs = require('fs')

module.exports = (status, name) => {
    oldupdata = require("../updb.json");
    log("Calculating up percentages for server " + name + "...");
    if (typeof oldupdata[name] != "undefined") {
        if (oldupdata[name].length >= 50) {
            oldupdata[name][0] = oldupdata[name][1]
            oldupdata[name][1] = oldupdata[name][2]
            oldupdata[name][2] = oldupdata[name][3]
            oldupdata[name][3] = oldupdata[name][4]
            oldupdata[name][4] = oldupdata[name][5]
            oldupdata[name][5] = oldupdata[name][6]
            oldupdata[name][6] = oldupdata[name][7]
            oldupdata[name][7] = oldupdata[name][8]
            oldupdata[name][8] = oldupdata[name][9]
            oldupdata[name][9] = oldupdata[name][10]
            oldupdata[name][10] = oldupdata[name][11]
            oldupdata[name][11] = oldupdata[name][12]
            oldupdata[name][12] = oldupdata[name][13]
            oldupdata[name][13] = oldupdata[name][14]
            oldupdata[name][14] = oldupdata[name][15]
            oldupdata[name][15] = oldupdata[name][16]
            oldupdata[name][16] = oldupdata[name][17]
            oldupdata[name][17] = oldupdata[name][18]
            oldupdata[name][18] = oldupdata[name][19]
            oldupdata[name][19] = oldupdata[name][20]
            oldupdata[name][20] = oldupdata[name][21]
            oldupdata[name][21] = oldupdata[name][22]
            oldupdata[name][22] = oldupdata[name][23]
            oldupdata[name][23] = oldupdata[name][24]
            oldupdata[name][24] = oldupdata[name][25]
            oldupdata[name][25] = oldupdata[name][26]
            oldupdata[name][26] = oldupdata[name][27]
            oldupdata[name][27] = oldupdata[name][28]
            oldupdata[name][28] = oldupdata[name][29]
            oldupdata[name][29] = oldupdata[name][30]
            oldupdata[name][30] = oldupdata[name][31]
            oldupdata[name][31] = oldupdata[name][32]
            oldupdata[name][32] = oldupdata[name][33]
            oldupdata[name][33] = oldupdata[name][34]
            oldupdata[name][34] = oldupdata[name][35]
            oldupdata[name][35] = oldupdata[name][36]
            oldupdata[name][36] = oldupdata[name][37]
            oldupdata[name][37] = oldupdata[name][38]
            oldupdata[name][38] = oldupdata[name][39]
            oldupdata[name][39] = oldupdata[name][40]
            oldupdata[name][40] = oldupdata[name][41]
            oldupdata[name][41] = oldupdata[name][42]
            oldupdata[name][42] = oldupdata[name][43]
            oldupdata[name][43] = oldupdata[name][44]
            oldupdata[name][44] = oldupdata[name][45]
            oldupdata[name][45] = oldupdata[name][46]
            oldupdata[name][46] = oldupdata[name][47]
            oldupdata[name][47] = oldupdata[name][48]
            oldupdata[name][48] = oldupdata[name][49]
            if (status == 0) {
                oldupdata[name][49] = true
            } else {
                oldupdata[name][49] = false
            }
        } else {
            if (status == 0) {
                oldupdata[name].push(true);
            } else {
                oldupdata[name].push(false);
            }
        }
    } else {
        if (status == 0) {
            oldupdata[name] = [true]
        } else {
            oldupdata[name] = [false]
        }
    }
    percentage = 0;
    valid = 0;
    values = oldupdata[name].length;
    oldupdata[name].forEach((el, index) => {
        if (el == true) {
            valid = valid + 1;
        }
    })
    percentage = ((valid / values) * 100).toFixed(2)
    log("Calculated percentage!");
    log("Writing database data to file...");
    fs.writeFileSync("./updb.json", JSON.stringify(oldupdata, null, 4))
    log("Database wrote to 'updb.json'!");
    return percentage;
}