import { Bot, Message, Middleware } from "mirai-js"
import { GroupList, MiraiConfig, BotAccount } from "../config"
import fs from "fs"
import { Command } from "./command/command"

export class FrogBot extends Bot {
  CommandList: Command[] = []
  constructor() {
    super()
    this.dynamicImport().then(() => {
      this.open({
        baseUrl: MiraiConfig.url,
        verifyKey: MiraiConfig.key,
        qq: BotAccount.id,
      })
      const GroupFilter = new Middleware().groupFilter(GroupList, true).textProcessor()
      this.on(
        "GroupMessage",
        GroupFilter.done(async data => {
          let content: string = data.text
          let cmdReg = /^\w{1,6}(\s|$)/
          if (!cmdReg.test(content)) {
            return
          }
          let args = content.split(" ")
          console.log(args[0])
          for (let item of this.CommandList) {
            if (item.name === args[0]) {
              item.handler(data, args.slice(1))
              break
            }
          }
        })
      )
    })
  }

  async dynamicImport() {
    const path = __dirname + "/command/"
    fs.readdir(path, (err, files) => {
      files.forEach(file => {
        // add command to command list
        let reg = /\.js$/
        if (file !== "command.js" && reg.test(file)) {
          import(path + file).then(m => {
            let command = new m.default(this)
            this.CommandList.push(command)
          })
        }
      })
    })
  }
  async reply(message: any, content: string) {
    await this.sendMessage({
      group: message.sender.group.id,
      quote: message.messageChain[0].id,
      message: new Message().addText(content),
    })
  }

  async replyCustom(message: any, customMessage: Message) {
    await this.sendMessage({
      group: message.sender.group.id,
      quote: message.messageChain[0].id,
      message: customMessage,
    })
  }

  async echo(group: number, name: string, content: string) {
    console.log(`${name}: ${content}`)
    try {
      await this.sendMessage({
        group: group,
        message: new Message().addText(name + ":\n").addText(content),
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const bot = new FrogBot()
