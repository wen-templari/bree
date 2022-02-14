const { Message, Middleware } = require("mirai-js")
const bot = require("../bot")
const GroupId = 996966860 // test

const Dict = {
  pbp: "拼不拼",
  pljw: "拼了叫我",
  dx: "都行",
  zml: "在麦里",
  mgj: "妈个鸡",
}

class Bot {
  constructor() {
    const GroupFilter = new Middleware().groupFilter([GroupId]).textProcessor()
    bot.on(
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
        await bot.sendMessage({
          group: GroupId,
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
    await bot.sendMessage({
      group: GroupId,
      message: new Message().addText("Hello there!"),
    })
  }

  async getGroupAnnouncement(groupId) {
    bot.getGroupConfig({ group: groupId }).then(res => {
      console.log(res)
    })
  }

  async setGroupAnnouncement(groupId, content) {
    bot.setGroupConfig({
      group: groupId,
      announcement: content,
    })
  }
}
module.exports = new Bot()
