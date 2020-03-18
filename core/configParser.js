module.exports = () => {
	try {
		file = AULib.FileSystem.readFileSync('./data/config.xml').toString();
	} catch (e) {
		AUPanic("Unable to load config file. Make sure you copied the 'config.default.xml' file to 'config.xml'.", 0x000000ac, e.message, e.stack)
	}
	options = {
		attributeNamePrefix : "@_",
		textNodeName : "#text",
		ignoreAttributes : true,
		ignoreNameSpace : false,
		allowBooleanAttributes : false,
		parseNodeValue : true,
		parseAttributeValue : false,
		trimValues: true,
		cdataPositionChar: "\\c",
		parseTrueNumberOnly: false,
		arrayMode: false,
	};
	try {
		config = AULib.XmlParser.parse(file, options, true);
	} catch (e) {
		AUPanic("Couldn't parse and load XML config", 0x0000010c, e.message, e.stack)
	}
	if (typeof config.AutoUptime == "undefined") {
		AUPanic("Config is not valid Auto-Uptime XML Config", 0x0000f10c, "<AutoUptime> Tag Not Found", "config.xml")
	}
	return config;
}