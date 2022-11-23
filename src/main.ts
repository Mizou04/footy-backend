import http from "http";
import qs from "qs"
import "dotenv/config"
import getStandings from "./api/handlers/getStandings";
import getTeams from "./api/handlers/getTeams";
import redisClient from "./api/configs/redis"
import { UnavailableData } from "./common/Errors";
import availableLeagues from "./api/leagues";
import getSeasons from "./api/handlers/getSeasons";

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;


let server = http.createServer({}, async (req, res)=>{
  res.writeHead(200, "OK", {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Origin" : process.env.NODE_ENV == "development" ? "http://localhost:3000" : "null",
    "Vary" : "origin",
  })
  
  // await redisClient.SET(req.url as stringname', 'hamza', {
  //   EX : 3600,
  //   NX : true
  // })
  
  let url : URL = new URL(req.url as string, `http://${req.headers.host}`);

  try {
    
    let pathname = url.pathname;
    let params = url.searchParams;
    let paramsString = params.toString();
    let paramsObj = qs.parse(paramsString) as {[key : string] : string | number};

    switch(pathname){
      case "/api/standings" : {
        try {
          if(!paramsString) throw new Error("params are necessary")
          let cached = await redisClient.GET(req.url as string) as string;
          if(cached){
            console.log('sent from cache');
            res.end(cached);
            return;
          }
          let result = await getStandings(paramsObj);
          res.end(JSON.stringify(result));
          
          redisClient.set(req.url as string, JSON.stringify(result), {EX : 3 * HOUR});
          redisClient.BGSAVE();


        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      case "/api/seasons" : {
        try {
          if(!paramsString) throw new Error("params are necessary");
          let cached = await redisClient.GET(req.url as string) as string;
          if(cached){
            console.log('sent from cache');
            res.end(cached);
            return;
          }
          let result = await getSeasons(paramsObj);
          res.end(JSON.stringify(result));
          
          redisClient.set(req.url as string, JSON.stringify(result), {EX : 1 * DAY});
          redisClient.BGSAVE();

        } catch (error) {
          
        }
        break;
      }
      case "/api/leagues" : {
        try {
          let cached = await redisClient.GET(req.url as string) as string;
          if(cached){ //cached?
            console.log('sent from cache');
            res.end(cached);
            return;
          }
          
          let leagues = availableLeagues;
          res.end(JSON.stringify(leagues));
          
          await redisClient.set(req.url as string, JSON.stringify(leagues), {EX : 5 * DAY});
          await redisClient.BGSAVE();

        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          if(error instanceof UnavailableData){
            res.end(`{error : ${(error as Error).message}}`)
          } else {
            res.end('{error : "page not found"}')
          }
        }
        break;
      }
      case "/api/teams" : {
        try {
          if(!paramsString) throw new Error("params are necessary");
          
          let cached = await redisClient.GET(req.url as string) as string;
          if(cached){ //caching
            console.log('sent from cache');
            res.end(cached);
            return;
          }

          let teams = await getTeams(paramsObj);
          res.end(JSON.stringify(teams));

          await redisClient.set(req.url as string, JSON.stringify(teams), {EX : DAY});
          await redisClient.BGSAVE();

          
        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      default : {
        res.writeHead(404);
        res.end("{error : page not found}");
        break;
      }
    }
    
  } catch (error) {
    console.log(error);
    res.writeHead(500);
    res.end(`{error : sorry for the inconvenience}`);
  }

})

let host = "localhost", port = 4000;

server.listen(port, host, undefined, ()=>{
  console.log("listening at port " + port)
})
