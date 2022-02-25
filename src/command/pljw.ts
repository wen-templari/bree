import commander from "commander"
import { FrogBot } from "../frog-bot"
import { Command, BaseCommand } from "./command"
import client from "../util/redis"

export default class PLJW extends BaseCommand implements Command {
  bot: FrogBot
  name = "pljw"
  message: any
  program

  constructor(bot: FrogBot) {
    super()
    this.bot = bot
    this.program = new commander.Command()
  }

  setProgram() {
    let id = this.message.sender.id
    let group = this.message.sender.group.id
    try {
      this.program
        .description("@ me when someone asked pbp")
        .option("-t, --ttl <minutes>", "set expire time")
        .action(async (key, options) => {
          let ttl = 3600
          if (options.ttl) {
            ttl = parseInt(options.ttl) * 60
          }
          await this.addPLJW(client, id, group, ttl)
        })
    } catch (error) {
      console.log(error)
    }
  }

  async addPLJW(client: any, id: number, group: number, ttl: number) {
    let key = `pljw:${group}:${id}`
    client.hSet(key, "id", id)
    client.sendCommand(["EXPIRE", key, `${ttl}`])
  }
}
