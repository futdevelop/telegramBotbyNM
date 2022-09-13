const { Telegraf, Markup } = require('telegraf');
										 require('dotenv').config();
const apiCovid = require('covid19-api');
const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx =>ctx.reply(`Привіт ${ctx.message.from.firstName ? ctx.message.from.firstName : 'незнайомець'}`));
bot.help(ctx => ctx.reply(text.commands));


bot.command('covid19', async ctx => {
	try {
		await ctx.replyWithHTML(
			'<b>Статистика COVID19</b>',
			Markup.inlineKeyboard([
				[
					Markup.button.callback('СВІТУ', 'btn_4'),
					Markup.button.callback('Окремої країни', 'btn_5'),
				],
			])
		);
	} catch(e) {
		console.log('Помилка');
	}
});


bot.action('btn_4', async ctx => {
	try {
		await ctx.answerCbQuery();
		let data = {};
		data = await apiCovid.getReportsByCountries('СВІТУ');

		let responce = `
Країна: ${data[0][0].country}
Випадки: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вилікувалось: ${data[0][0].recovered}
		`;

		ctx.reply(responce);
	} catch (e) {
		// console.log(e);
		console.log(e);
		ctx.reply('Помилка, такої країни не існую');
	}
});



bot.command('action', async(ctx) => {
	try {
	await ctx.replyWithHTML('<b>Виберіть цифру</b>', Markup.inlineKeyboard(
		[
			[Markup.button.callback('1', 'btn_1'),
			Markup.button.callback('2', 'btn_2'),
			Markup.button.callback('3', 'btn_3'),],
		]
		));		
	} catch(e) {
		console.error(e);
	}
});

function addActionBot(name, src, text) {
	bot.action(name, async ctx => {
		try {
			await ctx.answerCbQuery();
			if(src !== false) {
				await ctx.replyWithHTML({
					source: src
				});
			}
			await ctx.replyWithHTML(text, {
				disableWebPagePreview: true,
			});
		} catch (e) {
			console.error(e);
		}
	});	
} 







addActionBot('btn_1', false, text.text1);
addActionBot('btn_2', false, text.text2);
addActionBot('btn_3', false, text.text3);

addActionBot('btn_4', false, text.text4);
addActionBot('btn_5', false, text.text5);
addActionBot('btn_6', false, text.text6);
addActionBot('btn_7', false, text.text7);



bot.launch(console.log('Бот запустився'));
console.log();













// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
