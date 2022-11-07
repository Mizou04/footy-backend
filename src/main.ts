import http from "http";
import qs from "qs"
import "dotenv/config"
import callApi from "./api/callApi";
import { getStanding } from "./api/mockCallApi";
// import { seasons, createLast3Years } from "./api/seasons";
import { Tparams } from "./api/types/params";
import getStandings from "./api/handlers/getStandings";
import availableLeagues from "./api/functions/createLeagues";
import getLeagues from "./api/handlers/getLeagues";
import getLeague from "./api/handlers/getLeague";
import getTeams from "./api/handlers/getTeams";
import redisClient from "./api/configs/redis"


let host = "localhost", port = 3000;

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;


let server = http.createServer({}, async (req, res)=>{
  res.writeHead(200, "OK", {
    "Content-type" : "application/json",
    "Access-Control-Allow-Origin" : process.env.NODE_ENV == 'production' ? 'null' : "http://localhost:3000"
  })
  
  // await redisClient.SET(url.hrefname', 'hamza', {
  //   EX : 3600,
  //   NX : true
  // })
  
  let url : URL = new URL(req.url as string, `http://${req.headers.host}`);

  try {
    
    let pathname = url.pathname;
    let params = url.searchParams;
    params.sort(); // we sort the params to get unique key [for caching] 
    let paramsString = params.toString();
    let paramsObj = qs.parse(paramsString) as {[key : string] : string | number};

    switch(pathname){
      case "/api/standing" : {
        try {
          if(await redisClient.EXISTS(url.href)){ //caching
            let cached = await redisClient.GET(url.href) as string;
            console.log('sent from cache');
            return res.end(JSON.parse(cached));
          }

          let result = await getStanding(paramsObj);
          
          await redisClient.set(url.href, JSON.stringify(result), {EX : 3 * HOUR});
          await redisClient.BGSAVE();

          setTimeout(()=>{
            res.end(JSON.stringify(result))
            console.log("sent from api [took 3 seconds]")
          }, 3000)
        
        } catch (error) {
          res.writeHead(404);
          res.end((error as Error).message);
        }
        break;
      }
      case "/api/standings" : {
        try {
          if(!paramsString) throw new Error("params are necessary")
          if(await redisClient.EXISTS(url.href)){
            let cached = await redisClient.GET(url.href) as string;
            console.log('sent from cache');
            return res.end(JSON.parse(cached));
          }
          let result = await getStandings(paramsObj);
          
          await redisClient.set(url.href, JSON.stringify(result), {EX : 3 * HOUR});
          await redisClient.BGSAVE();

          res.end(result);

        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      case "/api/leagues" : {
        try {
          if(await redisClient.EXISTS(url.href)){ //caching
            let cached = await redisClient.GET(url.href) as string;
            console.log('sent from cache');
            return res.end(JSON.parse(cached));
          }
          let leagues = await getLeagues();

          await redisClient.set(url.href, JSON.stringify(leagues), {EX : 5 * DAY});
          await redisClient.BGSAVE();

          res.end(leagues);
        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      case "/api/teams" : {
        try {
          if(!paramsString) throw new Error("params are necessary");
          
          if(await redisClient.EXISTS(url.href)){ //caching
            let cached = await redisClient.GET(url.href) as string;
            console.log('sent from cache');
            return res.end(JSON.parse(cached));
          }

          let teams = await getTeams(paramsObj);

          await redisClient.set(url.href, JSON.stringify(teams), {EX : DAY});
          await redisClient.BGSAVE();

          res.end(teams);
          
        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      // case "/api/league" : {
      //   try {
      //     if(!paramsString) throw new Error("params are necessary");

      //     if(await redisClient.EXISTS(url.href)){ //caching
      //       let cached = await redisClient.GET(url.href) as string;
      //       console.log('sent from cache');
      //       return res.end(JSON.parse(cached));
      //     }          
      //     let league = await getLeague(paramsObj);

      //     await redisClient.set(url.href, JSON.stringify(league), {EX : 2 * DAY});
      //     await redisClient.BGSAVE();

      //     res.end(league);

      //   } catch (error) {
      //     console.log(error);
      //     res.writeHead(404, undefined, {});
      //     res.end(`{error : ${(error as Error).message}}`)
      //   }
      //   break;
      // }
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


server.listen(port, host, undefined, ()=>{
  console.log("listening at port " + port)
})
