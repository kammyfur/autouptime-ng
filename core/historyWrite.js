module.exports = () => {
	AULib.FileSystem.writeFileSync("./data/history.cache.json", JSON.stringify(AUHistory, null, 4));
}