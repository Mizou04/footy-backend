import "dotenv/config"
import {createClient} from "redis";
import cp from "child_process"
import path from "path"


let run_redis_script = cp.spawn(path.resolve(__dirname, "../../persistence/redis/run-server.sh"));


run_redis_script.on("error", (err)=>{
  if(run_redis_script.exitCode !== 0){
    return;
  } else {
    console.log(err);
    console.log("redis is not caching any more")
    client.shutdown("SAVE");
    // process.exit(1);
  }
})


let client = createClient({
  url : `redis://127.0.0.1:${process.env.REDIS_PORT}`,
  username : process.env.REDIS_USERNAME as string,
  password : process.env.REDIS_PASSWORD as string,
})


client.on("error", (e)=> {
  console.log('Error occured');
});

client.on("close", ()=>{
  
  console.log('byyyyee')
})

client.on("connect", ()=>{
  console.log("redis cache on port " + process.env.REDIS_PORT)
})



client.connect()

export default client
