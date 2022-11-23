import https from "https";
import qs from "qs"
import "dotenv/config";


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
export default async function callApi(input : {pathname : string, params : {[k : string] : string | number}} ) : Promise<string>{

  return new Promise((resolve, reject)=>{

    let options : https.RequestOptions = {
      method : "GET",
      headers : HEADERS,
      protocol : PROTOCOL,
      hostname : HOSTNAME,
      path : input.pathname + "?" + qs.stringify(input.params),  
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
