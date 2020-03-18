try {
	// Load whole Auto-Uptime library
	global.AULib = {
		XmlParser: require('fast-xml-parser'),
		FileSystem: require('fs'),
		KernelUtils: require('util'),
		FtpAgent: require('jsftp')
	}
	global.AUFinishedActions = false;

	// Load required components
	global.AUConfigParser = require('./core/configParser.js');
	global.AUPanic = require('./core/panic.js');
	global.AUBuildProperties = require('./core/buildProp.json');
	global.AUCreateOutput = require('./core/outputCreator.js');
	global.AULoadHistory = require('./core/historyLoader.js');
	global.AUCrawlSources = require('./core/crawlSources.js');
	global.AUWriteOutput = require('./core/outputWriter.js');
	global.AUPushHistory = require('./core/historyPush.js');
	global.AUWriteHistory = require('./core/historyWrite.js');
	global.AUCalculatePercentage = require('./core/historyPercentages.js');
	global.AUFtpDaemon = require('./core/ftpDaemon.js');
	global.AUFtpSendAgent = require('./core/ftpPushFile.js');

	// Start with everything loaded
	global.AUConfig = AUConfigParser();
	AUFtpDaemon()
	AUCreateOutput()
	AULoadHistory()
	AUCrawlSources()
	AUWriteOutput()
	AUWriteHistory()
	AUFtpSendAgent()
	
	// Automatically run everything at specific interval
	setInterval(() => {
		// In case user edited some files, reload everything
		global.AUConfig = AUConfigParser();
		AUCreateOutput()
		AULoadHistory()
		AUCrawlSources()
		AUWriteOutput()
		AUWriteHistory()
	}, 60000)
} catch (e) {
	require('./core/panic.js')("Internal system error", 0x000000ff, e.message, e.stack)
}