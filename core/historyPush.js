module.exports = (code) => {
	AUHistory.unshift(code);
	AUHistory.length = Math.min(AUHistory.length, 30)
	AUWriteHistory();
}