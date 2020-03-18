module.exports = () => {
	if (AUConfig.AutoUptime.Export.ExportMode == "ftp") {
		AUFtpWrapper.put(AULib.FileSystem.readFileSync("./data/output.json"), AUConfig.AutoUptime.Export.ExportModeFtp.FileName, err => {
			if (!err) {
				console.log("libauftpu: File uploaded to FTP successfully");
			} else {
				console.log("libauftpu: Unable to upload to FTP: " + err.message);
			}
		});
		setInterval(() => {
			AUFtpWrapper.put(AULib.FileSystem.readFileSync("./data/output.json"), AUConfig.AutoUptime.Export.ExportModeFtp.FileName, err => {
				if (!err) {
					console.log("libauftpu: File uploaded to FTP successfully");
				} else {
					console.log("libauftpu: Unable to upload to FTP: " + err.message);
				}
			});
		}, 60000)
	}
}