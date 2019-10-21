  
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const { reply } = Telegraf;

let ethiopic = require('ethiopic-js');

const bot = new Telegraf(process.env.BOT_TOKEN);


const welcomeMessage = "Hello";


bot.start((ctx) => ctx.reply('Hello '));
bot.help((ctx) => ctx.reply('Help message'));

bot.command('date', (ctx)=>{
  
  let gDate = new Date();
  
  let eDate = ethiopic.toEthiopic(gDate.getFullYear(),gDate.getMonth() + 1,gDate.getDate());
  
  ctx.reply("In Ethiopian Calender to day is: " + eDate[2] + "/" + eDate[1] + "/" + eDate[0] );
  
});



bot.launch();

console.log(process.env.BOT_TOKEN);
