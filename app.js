// const Koa = require('koa');
// const app = new Koa();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// app.listen(3000);

const bot = require("./util/bot")

setTimeout(() => {
  bot.msgTest()
}, 1000)
