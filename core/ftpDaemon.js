module.exports = () => {
	if (AUConfig.AutoUptime.Export.ExportMode == "ftp") {
		if (AUConfig.AutoUptime.Export.ExportModeFtp.Authentication) {
			global.AUFtpWrapper = new AULib.FtpAgent({
				host: AUConfig.AutoUptime.Export.ExportModeFtp.Host,
				port: AUConfig.AutoUptime.Export.ExportModeFtp.Port,
				user: AUConfig.AutoUptime.Export.ExportModeFtp.Credentials.UserName,
				pass: AUConfig.AutoUptime.Export.ExportModeFtp.Credentials.Password
			});
		} else {
			global.AUFtpWrapper = new AULib.FtpAgent({
				host: AUConfig.AutoUptime.Export.ExportModeFtp.Host,
				port: AUConfig.AutoUptime.Export.ExportModeFtp.Port
			});
		}
	}
}