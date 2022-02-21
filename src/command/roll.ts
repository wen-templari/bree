import { FrogBot } from "../frog-bot"
import commander from "commander"
import { BaseCommand, Command } from "./command"
import programFactory from "../util/program-factory"

export default class Roll extends BaseCommand implements Command {
  bot: FrogBot
  name = "roll"
  message: any
  program

  constructor(bot: FrogBot) {
    super()
    this.bot = bot
    // TODO
    this.program = new commander.Command()
  }

  setProgram() {
    this.program = programFactory(this.bot, this.message)
    try {
      this.program
        .argument("<upper>")
        .argument("[lower]")
        // .option("-a", "--array <items...>", "roll item")
        .action(async (upper, lower, options) => {
          // if (options.array) {
          //   console.log(options.array)
          //   let res = await this.rollArray(options.array)
          //   await this.bot.reply(this.message, res)
          //   return
          // }
          if (lower === undefined) {
            lower = 1
          }
          let upperNum = parseInt(upper)
          let lowerNum = parseInt(lower)
          if (isNaN(upperNum)) {
            this.bot.reply(this.message, "upper is not a number")
            return
          }
          if (isNaN(lowerNum)) {
            this.bot.reply(this.message, "lower is not a number")
          }
          let res = this.rollNumber(upperNum, lowerNum)
          await this.bot.reply(this.message, res.toString())
        })
      this.program
        .command("arr <items...>")
        .description("print array")
        .action(async (items, options) => {
          let res = this.rollArray(items)
          await this.bot.reply(this.message, res)
        })
    } catch (error) {
      console.log(error)
    }
  }

  rollNumber(upper: number, lower: number) {
    let res = Math.floor(Math.random() * (upper - lower + 1)) + lower
    return res
  }

  rollArray(items: string[]) {
    let res = items[Math.floor(Math.random() * items.length)]
    return res
  }
}
