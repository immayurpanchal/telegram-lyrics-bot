const { Telegraf } = require('telegraf');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log('Bot started', process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me lyrics!'));
bot.on('text', (ctx) => {
	console.log(ctx.message.text);

	const width = 1080;
	const height = 1080;

	const canvas = createCanvas(width, height);
	const context = canvas.getContext('2d');

	context.fillStyle = '#000';
	context.fillRect(0, 0, width, height);

	context.font = 'bold 35pt Menlo';
	context.textAlign = 'center';
	context.textBaseline = 'top';

	const text = ctx.message.text;

	const textWidth = context.measureText(text).width;
	context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
	context.fillStyle = '#fff';
	context.fillText(text, 600, 170);

	const buffer = canvas.toBuffer('image/png');
	// fs.writeFileSync('./test.png', buffer);
	bot.telegram.sendPhoto(ctx.message.chat.id, { source: buffer });
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
