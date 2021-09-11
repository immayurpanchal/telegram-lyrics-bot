const axios = require('axios').default;

const getLyrics = async (link) => {
	const { data } = await axios.get(
		`https://lyrics-api-bestupid.herokuapp.com/lyrics/?query=${link}&lyrics=true`
	);
	const { lyrics } = data;
	return lyrics.replace(/<br>/gm, '\n');
};

module.exports = { getLyrics };
