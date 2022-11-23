import "dotenv/config"
import {createClient} from "redis";

let client = createClient({
  url : `redis://127.0.0.1:${process.env.REDIS_PORT}`,
  username : process.env.REDIS_USERNAME as string,
  password : process.env.REDIS_PASSWORD as string,
})

client.on("error", (e)=> {
  console.log('Error occured');
  console.log(e);
  client.shutdown("SAVE");
  process.exit(1);
});

client.on("close", ()=>{
  client.shutdown("SAVE");
  console.log('byyyyee')
})

client.on("connect", ()=>{
  console.log("redis cache on port " + process.env.REDIS_PORT)
})

process.on("beforeExit", ()=>{
  client.shutdown("SAVE");
})

process.on("exit", ()=>{
  client.shutdown("SAVE");
})

client.connect()

export default client
