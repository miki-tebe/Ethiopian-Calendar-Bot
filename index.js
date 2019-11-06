const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const {reply} = Telegraf;

let ethiopic = require('ethiopic-js');

const bot = new Telegraf(process.env.BOT_TOKEN);


const welcomeMessage = "Hello, you can use /date to get today's date in Ethiopian Calender";


bot.start((ctx) => {
    console.log("aa");
    return ctx.reply(welcomeMessage);
});
bot.help((ctx) => ctx.reply('Help message'));

bot.command('date', (ctx) => {
    let gDate = new Date();
    let eDate = ethiopic.toEthiopic(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
    return ctx.reply("In Ethiopian Calender today is: " + eDate[2] + "/" + eDate[1] + "/" + eDate[0]);
});

const PRODUCTION = true;

if (PRODUCTION) {
    bot.telegram.setWebhook(`https://ethiopian-calender-bot.herokuapp.com/${process.env.BOT_TOKEN}`).then(console.log);
    bot.startWebhook(`/${process.env.BOT_TOKEN}`, null, process.env.PORT);
} else {
    bot.launch()
        .then(() => console.log("Bot Launched"))
        .catch(console.log);
}



