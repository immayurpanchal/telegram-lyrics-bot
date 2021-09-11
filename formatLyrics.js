const formatLyrics = (text) => {
	const lines = text.split('\n');
	const formattedLyrics = [];
	for (let i = 0; i < lines.length; i++) {
		if (i === 16) {
			break;
		}
		formattedLyrics.push(lines[i]);
	}
	return formattedLyrics.join('\n');
};

module.exports = { formatLyrics };
