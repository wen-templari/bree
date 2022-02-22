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

import { createClient } from "redis"

const getClient = async () => {
  const client = createClient()

  client.on("error", err => console.log("Redis Client Error", err))

  await client.connect()
  return client
}
// const client = await getClient()

const addPLJW = async (client: any, id: number, group: number) => {
  let key = `pljw:${group}:${id}`
  client.hSet(key, "id", id)
  client.sendCommand(["EXPIRE", key, "3600"])
  getPLJW(client, group)
}

const test = async () => {
  const client = await getClient()
  await addPLJW(client, 1, 2)
}
test()

const getPLJW = async (client: any, group: any) => {
  // let keys = await client.sendCommand(["keys", `pljw:${group}:*`])
  let keys = await client.keys("pljw:1:*")
  let res = []
  for (let key of keys) {
    // let id = await client.hGetAll(key)
    let id = await client.sendCommand(["HGET", key, "id"])
    res.push(parseInt(id))
  }
}
// getPLJW
