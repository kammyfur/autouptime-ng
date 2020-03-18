module.exports = () => {
	// AUHistory
	percentage = 0;
    valid = 0;
    values = AUHistory.length;
    AUHistory.forEach((el, index) => {
        if (el == 0) {
            valid = valid + 1;
        }
    })
	percentage = ((valid / values) * 100).toFixed(2);
	return percentage;
}