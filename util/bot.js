const { Bot, Message, Middleware } = require("mirai-js")
const { GroupList, MiraiConfig, BotAccount } = require("../config")
const Dict = {
  pbp: "拼不拼",
  pljw: "拼了叫我",
  dx: "都行",
  zml: "在麦里",
  mgj: "妈个鸡",
}

class TranslateBot {
  constructor() {
    this.bot = new Bot()
    this.bot.open({
      baseUrl: MiraiConfig.url,
      verifyKey: MiraiConfig.key,
      qq: BotAccount.id,
    })
    const GroupFilter = new Middleware().groupFilter(GroupList).textProcessor()
    this.bot.on(
      "GroupMessage",
      GroupFilter.done(async data => {
        console.log(data.text)
        let content = data.text
        let reg = /^t\s/
        if (!reg.test(content)) {
          return
        }
        content = content.replace(reg, "")
        content = this.translate(content)
        await this.bot.sendMessage({
          group: data.sender.group.id,
          message: new Message().addText(data.sender.memberName + ":\n").addText(content),
        })
        // await bot.recall({ messageId: data.messageChain[0].id })
      })
    )
  }

  translate(str) {
    let res = str
    for (let key in Dict) {
      res = res.replace(new RegExp(key, "g"), Dict[key])
    }
    return res
  }

  async msgTest() {
    await this.bot.sendMessage({
      group: 996966860,
      message: new Message().addText("Hello there!"),
    })
  }
}
module.exports = new TranslateBot()
