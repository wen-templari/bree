import commander from "commander"
import { FrogBot } from "../frog-bot"
import { Command, BaseCommand } from "./command"
import client from "../util/redis"
import { Message } from "mirai-js"

export default class PBP extends BaseCommand implements Command {
  bot: FrogBot
  name = "pbp"
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
    let senderId = this.message.sender.id
    try {
      this.program.description("@ those who want to pyq").action(async (key, options) => {
        let atList = await this.getPLJW(client, group, senderId)
        let msg = new Message()
        for (let at of atList) {
          msg.addAt(at)
        }
        this.bot.replyCustom(this.message, msg)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getPLJW(client: any, group: any, senderId: any) {
    let keys = await client.keys("pljw:" + group + "*")
    let res: number[] = []
    for (let key of keys) {
      let id = await client.sendCommand(["HGET", key, "id"])
      if (id != senderId) {
        res.push(parseInt(id))
        client.sendCommand(["DEL", key])
      }
    }
    return res
  }
}
