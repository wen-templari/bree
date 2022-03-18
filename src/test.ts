function formatDict(dict: any) {
  // let msg = new Message()
  let msg = "词典\n"
  for (let key in dict) {
    msg += `  ${key} ${dict[key]}\n`
  }
  return msg
}
