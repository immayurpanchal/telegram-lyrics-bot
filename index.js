const { Telegraf } = require('telegraf');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { getLyrics } = require('./getLyrics');
const { formatLyrics } = require('./formatLyrics');

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log('Bot started', process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me lyrics!'));
bot.on('text', async (ctx) => {
	console.log(ctx.message.text);
	let fetchedLyrics = '';
	try {
		fetchedLyrics = await getLyrics(ctx.message.text);
		fetchedLyrics = formatLyrics(fetchedLyrics);
	} catch (error) {
		console.log(error);
	}
	console.log(fetchedLyrics);
	const width = 1080;
	const height = 1080;

	const canvas = createCanvas(width, height);
	const context = canvas.getContext('2d');

	const img = await loadImage('./assets/img/022_Morpheus_Den.png');
	context.drawImage(img, 0, 0, width, height);
	const text = fetchedLyrics;
	console.log(text.length);

	if (text.length < 10) {
		context.font = '75pt Menlo';
	} else if (text.length < 20) {
		context.font = '50pt Menlo';
	} else {
		context.font = '35pt Menlo';
	}

	context.textAlign = 'center';
	context.textBaseline = 'top';

	const textWidth = context.measureText(text).width;
	context.fillStyle = '#fff';
	context.fillText(text, 540, 50, 900);

	const buffer = canvas.toBuffer('image/png');
	// fs.writeFileSync('./test.png', buffer);
	bot.telegram.sendPhoto(ctx.message.chat.id, { source: buffer });
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
