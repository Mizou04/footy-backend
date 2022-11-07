import "dotenv/config"
import {createClient} from "redis";
import cp from "child_process"
import path from "path"


let client = createClient({
  url : `redis://127.0.0.1:${process.env.REDIS_PORT}`,
  username : process.env.REDIS_USERNAME as string,
  password : process.env.REDIS_PASSWORD as string,
})


client.on("error", (e)=> {
  console.log('byyyyee')
});

client.on("connect", ()=>{
  console.log("redis cache on port " + process.env.REDIS_PORT)
})



client.connect()

export default client
