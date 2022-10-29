import http from "http";
import qs from "qs"
import "dotenv/config"
import callApi from "./api/callApi";
import mockCallApi from "./api/mockCallApi";
// import { seasons, createLast3Years } from "./api/seasons";
import { Tparams } from "./api/types/params";
import getStandings from "./api/handlers/getStandings";
import availableLeagues from "./api/functions/createLeagues";
import getLeagues from "./api/handlers/getLeagues";
import getLeague from "./api/handlers/getLeague";

let host = "localhost", port = 3000;


let server = http.createServer({}, async (req, res)=>{
  res.writeHead(200, "OK", {
    "Content-type" : "application/json"
  })
  
  let url : URL = new URL(req.url as string, `http://${req.headers.host}`);
  
  try {
    
    let pathname = url.pathname;
    let params = url.searchParams; 
    let paramsString = params.toString();
    
    
    switch(pathname){
      case "/api/standings" : {
        try {
          if(!paramsString) throw new Error("params are necessary")
          res.end(await getStandings(paramsString));
        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      // get seasons depending on league
      case "/api/leagues" : {
        try {
          let leagues = await getLeagues();
          res.end(JSON.stringify(leagues, null, 2));
        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      case "/api/league" : {
        try {
          if(!paramsString) throw new Error("params are necessary")
          let league = await getLeague(paramsString);
          res.end(JSON.stringify(league, null, 2));
        } catch (error) {
          console.log(error);
          res.writeHead(404, undefined, {});
          res.end(`{error : ${(error as Error).message}}`)
        }
        break;
      }
      default : 
        res.writeHead(404);
        res.end("{error : not implemented}");
        break;
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
