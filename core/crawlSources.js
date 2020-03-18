module.exports = async function () {
	sites = AUConfig.AutoUptime.Sites.AutouptimeSite;
	el = [];
	sites.forEach(async (s, i) => {
		if (typeof s == "string") {
			return;
		} else {
			el[i] = {};
			el[i].name = s.CommonName;
			el[i].main = s.Main;
			if (el[i].main) {
				el[i].history = [];
			} else {
				el[i].history = null;
			}
			if (el[i].main) {
				crawl = s.Crawls.SiteCrawl[0];
				crawl['@jssp-main'] = true;
				el[i].data = {};
				directory = el[i].data;
				directory.name = crawl.CommonName;
				directory.description = crawl.Description;
				directory.plugin = crawl.Plugin;
				directory.percentage = AUCalculatePercentage();
				try {
					plugin = require("../plugins/" + directory.plugin);
				} catch (e) {
					AUPanic("Unable to load selected plugin", 0x000024db, e.message, e.stack)
				}
				directory.data = null;
				try {
					data = plugin(crawl);
					directory.data = data;
				} catch (e) {
					AUPanic("An error occured while running a plugin", 0x000024df, e.message, e.stack)
				}
				el[i].history = AUHistory;
			} else {
				el[i].data = [];
				await s.Crawls.SiteCrawl.forEach(async (c, e) => {
					if (typeof c == "string") {
						return;
					} else {
						crawl = c;
						crawl['@jssp-main'] = false;
						oldlength = el[i].data.length
						el[i].data[oldlength] = {};
						directory = el[i].data[oldlength];
						directory.name = crawl.CommonName;
						directory.description = crawl.Description;
						directory.plugin = crawl.Plugin;
						directory.percentage = null;
						try {
							plugin = require("../plugins/" + directory.plugin);
						} catch (e) {
							AUPanic("Unable to load selected plugin", 0x000024db, e.message, e.stack)
						}
						directory.data = null;
						try {
							data = plugin(crawl);
							directory.data = data;
						} catch (e) {
							AUPanic("An error occured while running a plugin", 0x000024df, e.message, e.stack)
						}
					}
				})
			}
			AUOutput.sites.push(el[i]);
			AUWriteOutput();
		}
	})
}