import commander from "commander"
import { Message } from "mirai-js"
import { FrogBot } from "../frog-bot"

export default function (bot: FrogBot, message: any) {
  let program = new commander.Command()
  program.exitOverride()
  program.configureOutput({
    writeOut: str => {
      bot.reply(message, str)
      return str
    },
    writeErr: str => {
      bot.reply(message, str)
      return str
    },
  })
  return program
}
