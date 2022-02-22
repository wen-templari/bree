import { FrogBot } from "../frog-bot"
import commander from "commander"

export interface Command {
  bot: FrogBot
  name: string
  program: commander.Command
  message: any
  handler(message: any, args: string[]): void
  setProgram(): void
}

export class BaseCommand implements Command {
  bot!: FrogBot
  name!: string
  program!: commander.Command
  message: any
  constructor() {}

  handler(message: any, args: string[]) {
    this.message = message
    this.resetProgram()
    this.setProgram()
    try {
      let contactedArgs = ["node", this.name, ...args]
      console.log(contactedArgs)
      this.program.parse(contactedArgs)
    } catch (error) {
      console.log(error)
    }
  }

  programFactory() {
    let program = new commander.Command()
    program.exitOverride()
    program.configureOutput({
      writeOut: str => {
        this.bot.reply(this.message, str)
        return str
      },
      writeErr: str => {
        this.bot.reply(this.message, str)
        return str
      },
    })
    return program
  }

  resetProgram() {
    this.program = this.programFactory()
  }

  setProgram(): void {
    throw new Error("Method not implemented.")
  }
}
