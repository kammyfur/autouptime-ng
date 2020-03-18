module.exports = () => {
	AULib.FileSystem.writeFileSync("./data/output.json", JSON.stringify(AUOutput, null, 4));
}