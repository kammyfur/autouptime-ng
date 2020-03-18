module.exports = (error, code, details, trace) => {
	buffer = "\n[AUTOUPTIME KERNEL PANIC!]\n\n" + hexcode(code) + "\n" + error + "\n\n" + new Buffer(details).toString("base64") + " (" + details + ")" + "\n\n" + trace + "\n\nProcess terminated unexpectedly\n";
	lines = buffer.split("\n");
	// console.log(lines);
	var itemsProcessed = 0;
	lines.forEach((content, index) => {
		setTimeout(() => {
			console.log(content);
			itemsProcessed++;
			if(itemsProcessed === lines.length) {
				process.exit(code);
			}
		}, 50 * (index + 1))
	})
	
}

function hexcode(code) {
	hex = code.toString(16);
	if (hex.length == 7) {
		hexstr = "0x0" + hex.toString(16);
	} else if (hex.length == 6) {
		hexstr = "0x00" + hex.toString(16);
	} else if (hex.length == 5) {
		hexstr = "0x000" + hex.toString(16);
	} else if (hex.length == 4) {
		hexstr = "0x0000" + hex.toString(16);
	} else if (hex.length == 3) {
		hexstr = "0x00000" + hex.toString(16);
	} else if (hex.length == 2) {
		hexstr = "0x000000" + hex.toString(16);
	} else if (hex.length == 1) {
		hexstr = "0x0000000" + hex.toString(16);
	} else if (hex.length == 0) {
		hexstr = "0x00000000" + hex.toString(16);
	} else {
		hexstr = "0x" + hex.toString(16)
	}
	return hexstr;
}