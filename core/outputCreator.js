module.exports = () => {
	date = new Date();
	global.AUOutput = {version:AUBuildProperties.version,date:date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),sites:[]}
}