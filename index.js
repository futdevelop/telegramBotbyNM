const { Telegraf, Markup } = require('telegraf')
										 require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнаномец'}`));
bot.help(ctx => ctx.reply(text.commands));

bot.command('actions', async(ctx) => {
	try {
	await ctx.replyWithHTML('<b>Действие</b>', Markup.inlineKeyboard(
		[
			[Markup.button.callback('1', 'btn_1'), Markup.button.callback('2', 'btn_2'), Markup.button.callback('3', 'btn_3'),],
			[Markup.button.callback('4', 'btn_4'), Markup.button.callback('5', 'btn_5'), Markup.button.callback('6', 'btn_6'),],
			[Markup.button.callback('7', 'btn_7'), Markup.button.callback('8', 'btn_8'), Markup.button.callback('9', 'btn_9'),],
		]
		));		
	} catch(e) {
		console.error(e)
	}
})

function addActionBot(name, src, text) {
	bot.action(name, async ctx => {
		try {
			await ctx.answerCbQuery();
			if(src !== false) {
				await ctx.replyWithHTML({
					source: src
				})
			}
			await ctx.replyWithHTML(text, {
				disable_web_page_preview: true,
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
addActionBot('btn_8', false, text.text8);
addActionBot('btn_9', false, text.text9);


bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
