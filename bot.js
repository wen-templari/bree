const { Bot, Message, Middleware } = require("mirai-js")
const { GroupList, MiraiConfig, BotAccount } = require("./config")
const Dict = {
  pbp: "拼不拼",
  zml: "在麦里",
  pyq: "拼一枪",
  pljw: "拼了叫我",
  psm: "拼什么",
  dx: "都行",
  bpl: "不拼了",
  mgj: "妈个鸡",
}
const options = {
  "-r": {
    description: "撤回上一条信息",
    text: true,
  },
  "-h": {
    description: "帮助",
  },
  "-d": {
    description: "获取词典",
  },
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
        let content = data.text
        let group = data.sender.group.id
        let memberName = data.sender.memberName
        let cmdReg = /^t\s/
        if (!cmdReg.test(content)) {
          return
        }
        content = content.replace(cmdReg, "")
        let optionReg = /^-[a-z]/
        let arg = ""
        if (optionReg.test(content)) {
          arg = content.match(optionReg)[0]
          content = content.replace(optionReg, "")
        }
        // for (let option in options) {
        //   if (option == arg) {
        //     options[option].handler(this.bot, data)
        //   }
        // }
        if (arg == "") {
          content = this.translate(content)
          await this.echo(group, memberName, content)
        } else if (arg == "-h") {
          await this.printHelp(group)
        } else if (arg == "-d") {
          await this.printDict(group)
        } else if (arg == "-r") {
          content = this.translate(content)
          await this.echo(group, memberName, content)
          try {
            await this.bot.recall({ messageId: data.messageChain[0].id })
          } catch (err) {
            console.log(err.message)
          }
        }
      })
    )
  }

  async translate(str) {
    let res = str
    let dict = await this.getDict()
    let sortedKeys = Object.keys(dict).sort((a, b) => {
      return a.length - b.length
    })
    let sortedDict = {}
    for (let key of sortedKeys) {
      sortedDict[key] = dict[key]
    }
    for (let key in sortedDict) {
      res = res.replace(new RegExp(key, "g"), sortedDict[key])
    }
    return res
  }

  async echo(group, name, content) {
    await this.bot.sendMessage({
      group: group,
      message: new Message().addText(name + ":\n").addText(content),
    })
  }

  async getDict() {
    return Dict
  }

  async printDict(group) {
    let msg = new Message()
    msg.addText("词典\n")
    for (let key in Dict) {
      msg.addText(`  ${key} ${Dict[key]}\n`)
    }
    await this.bot.sendMessage({
      group: group,
      message: msg,
    })
  }

  async printHelp(group) {
    let msg = new Message().addText("Usage\n")
    msg.addText("  t <text> 转换<text>\n")
    for (let key in options) {
      if (options[key].text) {
        msg.addText(`  t  ${key} <text> ${options[key].description}\n`)
      } else {
        msg.addText(`  t  ${key} ${options[key].description}\n`)
      }
    }
    msg.addText("\n项目地址:\nhttps://github.com/wen-templari/bree")
    await this.bot.sendMessage({
      group: group,
      message: msg,
    })
  }
}
module.exports = new TranslateBot()
