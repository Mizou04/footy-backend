// import QS_ from "querystring"
import readFile from "./readFile";
import qs from "qs"
import path from "path"

type Tparams = {[k : string] : string | number} | string

export async function getLeaguesFromFile(input : {url : string, params : string} ) : Promise<string>{
  input.url += input.url[input.url.length-1] !== "?" ? "?" : '';
  
  let paramsObj = qs.parse(input.params);

    if(!paramsObj["id"] || !paramsObj["season"]) throw new Error("season and id are necessary");
    let file = await readFile(path.resolve(__dirname, `../out/league-${paramsObj["id"]}-${paramsObj["season"]}.json`));
    return file;

} 


export async function getStanding(params : {[k : string] : number | string}){
  try {
  
    if(!params["id"] || !params["season"]) throw new Error("season and id are necessary");
    let PATH = path.resolve(__dirname, "../out/rankings.json"); 
    
    let file = await readFile(PATH);
    let rankingsJson : [{id : number, season : number}] = JSON.parse(file);
    let result = rankingsJson.filter(({id, season}) => {
      return id === Number(params["id"])  && season === Number(params["season"])
    })
    if(result.length > 0)
      return result
    else 
      throw new Error("no data")  
  } catch (error) {
    console.log(error);
    throw error;
  } 
}