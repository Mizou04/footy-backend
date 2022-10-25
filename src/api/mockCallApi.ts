// import QS_ from "querystring"
import readFile from "./readFile";
import path from "path"

type Tparams = {[k : string] : string | number} | string

export default async function(input : {url : string, params : string} ) : Promise<string>{
  input.url += input.url[input.url.length-1] !== "?" ? "?" : '';
  
  let paramsObj = input.params.split("&").reduce((init, curr)=>{
    let currArr = curr.split("=");
    let key = currArr[0];  
    let value = currArr[1];
    init[key] = value;
    return init
  }, {} as {[k : string] : string})

  try {
    if(!paramsObj["id"] || !paramsObj["season"]) throw new Error("season and id are necessary");
    let file = await readFile(path.resolve(__dirname, `../out/league-${paramsObj["id"]}-${paramsObj["season"]}.json`));
    return file;
  } catch (error) {
    throw error
  }

} 