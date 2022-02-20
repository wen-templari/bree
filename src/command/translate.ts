import { Message } from "mirai-js"
import commander from "commander"
import { FrogBot } from "../frog-bot"
import { Command, BaseCommand } from "./command"
import programFactory from "../util/program-factory"

export default class Translate extends BaseCommand implements Command {
  bot: FrogBot
  name = "ts"
  message: any
  program

  constructor(bot: FrogBot) {
    super()
    this.bot = bot
    // TODO
    this.program = new commander.Command()
  }

  setProgram() {
    let group = this.message.sender.group.id
    this.program = programFactory(group)
    let memberName = this.message.sender.memberName
    try {
      this.program
        .argument("<key>")
        .option("-r, --recall", "recall last message")
        .action(async (key, options) => {
          console.log(key)
          let res = await this.translate(key)
          await this.bot.echo(group, memberName, res)
          if (options.recall) {
            try {
              await this.bot.recall({ messageId: this.message.messageChain[0].id })
            } catch (error) {
              // not authorized
            }
          }
        })
      this.program
        .command("dict")
        .description("print dictionary")
        .action(async (key, options) => {
          this.printDict(group)
        })
      this.program
        .command("rand")
        .description("print random key")
        .action(async (key, options) => {
          let res = await this.getRandomKey()
          await this.bot.echo(group, memberName, res)
        })
    } catch (error) {
      console.log(error)
    }
  }

  async translate(str: string) {
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

  async printDict(group: any) {
    let msg = new Message()
    let Dict = await this.getDict()
    msg.addText("词典\n")
    for (let key in Dict) {
      msg.addText(`  ${key} ${Dict[key]}\n`)
    }
    await this.bot.sendMessage({
      group: group,
      message: msg,
    })
  }

  async getRandomKey() {
    let Dict = await this.getDict()
    let keys = Object.keys(Dict)
    let index = Math.floor(Math.random() * keys.length)
    return keys[index]
  }

  async getDict() {
    return {
      pbp: "拼不拼",
      zml: "在麦里",
      pyq: "拼一枪",
      pljw: "拼了叫我",
      psm: "拼什么",
      dx: "都行",
      bpl: "不拼了",
      mgj: "妈个鸡",
    }
  }
}
