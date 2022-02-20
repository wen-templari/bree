import commander from "commander"
import { Message } from "mirai-js"
import { bot } from "../frog-bot"

export default function (group: number) {
  let program = new commander.Command()
  program.exitOverride()
  program.configureOutput({
    writeOut: str => {
      console.log(str)
      bot.sendMessage({
        group: group,
        message: new Message().addText(str),
      })
      return str
    },
    writeErr: str => {
      return str
    },
  })
  return program
}
