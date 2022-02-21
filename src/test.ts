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

function formatDict(dict: any) {
  // let msg = new Message()
  let msg = "词典\n"
  for (let key in dict) {
    msg += `  ${key} ${dict[key]}\n`
  }
  return msg
}

// console.log(
//   formatDict({
//     a: "b",
//     c: "d",
//   })
// )

// const parsedValue = parseInt(value, 10);
// if (isNaN(parsedValue)) {
//   throw new commander.InvalidArgumentError('Not a number.');
// }

const roll = (upper: number, lower: number) => {
  return Math.floor(Math.random() * (upper - lower + 1) + lower)
}
for (let i = 0; i < 10; i++) {
  console.log(roll(20, 10).toString())
}
