// import fs from "fs"
// const path = __dirname + "/command/"
// fs.readdir(path, (err, files) => {
//   files.forEach(file => {
//     console.log(file)
//     const module = import(path + file).then(m => m.callSomeMethod())
//     // or const module = await import('file')
//   })
// })
// const translate = import("/Users/clas/projects/bree/src/command/translate").then(m => m.default)

const { Command } = require("commander") // include commander in git clone of commander repo
const program = new Command()

program
  .version("0.1.0")
  .argument("<username>", "user to login")
  .option("-p, --password <password>", "password to login")
  .description("example program for argument")
  .action((username: any) => {
    console.log("username:", username)
  })
program.command("dict").action((key: any, options: any) => {
  console.log("dict")
})
console.log(process.argv)
program.parse(['node','test','user'])
