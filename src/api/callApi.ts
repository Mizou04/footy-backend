import https from "https";
import config from "./config"
import QS from "querystring"
import fs from "fs";
import path from "path";
import "dotenv/config";


type Tparams = {[k : string] : string | number} | string

export default function callApi(input : {url : string, params : Tparams} ) : Promise<string>{
  
  input.url += input.url[input.url.length-1] !== "?" ? "?" : '';
  input.params = typeof input.params == "string" ? input.params : QS.stringify(input.params);

  return new Promise((resolve, reject)=>{
    // let url = new URL("/standings", config.HOSTNAME);
    let options : https.RequestOptions = {
      method : "GET",
      headers : config.HEADERS,
      hostname : config.HOSTNAME,
      path : input.url + input.params,
      protocol : "https:",
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
