const commander = require("commander")
const program = new commander.Command()

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')

let option = commander.createOption('-p, --pizza-type <type>', 'flavour of pizza')

program.addOption(option)

program.parse(['node', 'test.js', '--debug']);

const options = program.opts();
if (options.debug) console.log(options);
console.log('pizza details:');
if (options.small) console.log('- small pizza size');
if (options.pizzaType) console.log(`- ${options.pizzaType}`);