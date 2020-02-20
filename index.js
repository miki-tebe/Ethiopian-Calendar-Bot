const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');

let ethiopic = require('ethiopic-js');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    const welcomeMessage = "Hello, you can use /date to get today's date in Ethiopian Calender or use Get Date Button";
    ctx.reply(welcomeMessage,
        Markup.inlineKeyboard([
            Markup.callbackButton("Get Date", "GET_DATE")
        ]).extra());
});

bot.help((ctx) => ctx.reply("You can use /date to get today's date in Ethiopian Calender or use Get Date Button"));

function getdate() {
    // gregoraian date
    let gDate = new Date();
    // ethiopian date
    return ethiopic.toEthiopic(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
}

const getDateWizard = new WizardScene("get_date",
    (ctx) => {
        let eDate = getdate();
        ctx.reply(`In Ethiopian Calender today is:  ${eDate[2]}/${eDate[1]}/${eDate[0]} `,
            Markup.inlineKeyboard([
                Markup.callbackButton("Get Date", "GET_DATE")
            ]).extra());
        ctx.answerCbQuery();
    }
);

const stage = new Stage([getDateWizard], { default: "get_date" });

bot.command('date', (ctx) => {
    let eDate = getdate();
    ctx.reply(`In Ethiopian Calender today is:  ${eDate[2]}/${eDate[1]}/${eDate[0]} `,
        Markup.inlineKeyboard([
            Markup.callbackButton("Get Date", "GET_DATE")
        ]).extra());
    ctx.answerCbQuery();
});

const PRODUCTION = true;

bot.use(session());
bot.use(stage.middleware());

if (PRODUCTION) {
    bot.telegram.setWebhook(`https://ethiopian-calender-bot.herokuapp.com/${process.env.BOT_TOKEN}`).then(console.log);
    bot.startWebhook(`/${process.env.BOT_TOKEN}`, null, process.env.PORT);
} else {
    bot.launch()
        .then(() => console.log("Bot Launched"))
        .catch(console.log);
}
