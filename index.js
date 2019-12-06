const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');

let ethiopic = require('ethiopic-js');

const bot = new Telegraf(process.env.BOT_TOKEN);


const welcomeMessage = "Hello, you can use /date to get today's date in Ethiopian Calender or use Get Date Button";


bot.start((ctx) => {
    ctx.reply(welcomeMessage,
        Markup.inlineKeyboard([
            Markup.callbackButton("Get Date", "GET_DATE")
        ]).extra());
});

const getDateWizard = new WizardScene("get_date",
    (ctx) => {
        let gDate = new Date();
        let eDate = ethiopic.toEthiopic(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
        ctx.reply(`In Ethiopian Calender today is:  ${eDate[2]}/${eDate[1]}/${eDate[0]} `,
        Markup.inlineKeyboard([
            Markup.callbackButton("Get Date", "GET_DATE")
        ]).extra());
    }
);

const stage = new Stage([getDateWizard], { default: "get_date" });


bot.help((ctx) => ctx.reply("You can use /date to get today's date in Ethiopian Calender or use Get Date Button"));

bot.command('date', (ctx) => {
    let gDate = new Date();
    let eDate = ethiopic.toEthiopic(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
    ctx.reply(`In Ethiopian Calender today is:  ${eDate[2]}/${eDate[1]}/${eDate[0]} `,
        Markup.inlineKeyboard([
            Markup.callbackButton("Get Date", "GET_DATE")
        ]).extra());
});

bot.use(session());
bot.use(stage.middleware());

const PRODUCTION = true;

if (PRODUCTION) {
    bot.telegram.setWebhook(`https://ethiopian-calender-bot.herokuapp.com/${process.env.BOT_TOKEN}`).then(console.log);
    bot.startWebhook(`/${process.env.BOT_TOKEN}`, null, process.env.PORT);
} else {
    bot.launch()
        .then(() => console.log("Bot Launched"))
        .catch(console.log);
}



