const { Bot } = require("mirai-js")

const MiraiConfig = {
  url: "http://localhost:8080",
  key: "pbppsmzml",
}
const BotAccount = {
  id: "1708390042",
  password: "pbp1psm1",
}

const bot = new Bot()

try {
  bot.open({
    baseUrl: MiraiConfig.url,
    verifyKey: MiraiConfig.key,
    qq: BotAccount.id,
  })
} catch (error) {
  console.log(error)
}

module.exports = bot
