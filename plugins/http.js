module.exports = function (settings) {
	outputCode = null;
	outputMessage = null;
	
	processor = function (settings) {
		console.log("au-http > Requesting " + 'http://' + settings.Host + ":" + settings.Port + "/" + settings.Root + "...");
		AULib.HttpRequest = require("sync-request");
		try {
			var res = AULib.HttpRequest('GET', 'http://' + settings.Host + ":" + settings.Port + "/" + settings.Root, {headers: {'user-agent': '+MinteckProjectsAutoUptime/' + AUBuildProperties.version,},});
		} catch (e) {
			console.log(e.stack);
			outputCode = 3;
			outputMessage = "Unable to connect to server";
			return;
		}
		console.log("au-http > Status code for " + 'http://' + settings.Host + ":" + settings.Port + "/" + settings.Root + " is " + res.statusCode);
		if (res.statusCode == 200) {
			outputCode = 0;
			outputMessage = "Operational";
		}
		if (res.statusCode >= 300 && res.statusCode < 400) {
			outputCode = 1;
			outputMessage = "Server is redirecting client unexpectedly";
		}
		if (res.statusCode >= 400 && res.statusCode < 500) {
			outputCode = 2;
			outputMessage = "Client cannot correctly join server";
		}
		if (res.statusCode >= 500) {
			outputCode = 3;
			outputMessage = "Server isn't responding correctly";
		}
	}
	processor(settings);
	
	if (settings['@jssp-main'] == true) {
		AUPushHistory(outputCode);
	}
	return {code:outputCode,message:outputMessage};
}