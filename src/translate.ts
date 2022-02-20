import commander from "commander"
const program = new commander.Command()

program
  .option("-r <key>, --recall", "recall last message")
  .option("-i <value>, --invert", "invert translate")
  .option("-R, --random", "show random value")

program.command("dict").action((key, options) => {
  console.log("dict")
})

program.parse(["node", "ts.js", "-h"])

const options = program.opts()
if (options.debug) console.log(options)
console.log("pizza details:")
if (options.small) console.log("- small pizza size")
if (options.pizzaType) console.log(`- ${options.pizzaType}`)
