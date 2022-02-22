import { createClient } from "redis"

const getClient = () => {
  const client = createClient({
    url: "redis://redis:6379",
  })

  client.on("error", err => console.log("Redis Client Error", err))

  client.connect()
  return client
}

const client = getClient()
export default client
