module.exports = () => {
	if (AULib.FileSystem.existsSync("./data/history.cache.json")) {
		global.AUHistory = JSON.parse(AULib.FileSystem.readFileSync("./data/history.cache.json"));
	} else {
		AULib.FileSystem.writeFileSync("./data/history.cache.json", "[]");
		global.AUHistory = JSON.parse(AULib.FileSystem.readFileSync("./data/history.cache.json"));
	}
}