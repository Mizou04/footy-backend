import https from "https";
import QS from "querystring"
import "dotenv/config";
import { Tparams } from "./types/params";


const HOSTNAME = "v3.football.api-sports.io";

const HEADERS = {
  "x-apisports-key" : process.env.API_KEY,
}

const PROTOCOL = "https:"

/**
 * 
 * @param input.url is actually the pathname + params and not the whole url 
 * @return
 */
export default function callApi(input : {url : string} ) : Promise<string>{

  return new Promise((resolve, reject)=>{

    let options : https.RequestOptions = {
      method : "GET",
      headers : HEADERS,
      protocol : PROTOCOL,
      hostname : HOSTNAME,
      path : input.url,
    };

    let request = https.request(options);
    request.on("response", (res : {[k : string] : any})=>{
      let data = "";  

      res.on("data", (chunk : string)=>{
        data += chunk;
      })

      res.on("end", ()=>{
        resolve(data);
      })

    }).on("error", (err)=>{console.log(err); reject(err)});

    request.end();
  })
}
