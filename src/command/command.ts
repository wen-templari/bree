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
  // constructor() {
  //   console.log(this.name + " loaded")
  // }
  handler(message: any, args: string[]) {
    this.message = message
    this.setProgram()
    try {
      let contactedArgs = ["node", this.name, ...args]
      console.log(contactedArgs)
      this.program.parse(contactedArgs)
    } catch (error) {
      console.log(error)
    }
  }
  setProgram(): void {
    throw new Error("Method not implemented.")
  }
}
