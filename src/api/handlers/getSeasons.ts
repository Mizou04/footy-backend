/* get last 3 seasons of a league */
import callApi from "../callApi";
import getLeague from "./getLeague";


export default async function getSeasons(params : {[k : string] : string | number}){
  if(!params["id"]) throw new Error("league [id] is necessary");
  let response = await getLeague({id : params["id"]});
  let seasons : {year : number}[] = await response.seasons;
  
  return seasons.reduce((arr : number[], obj)=>{
    arr.push(obj.year);
    return arr;
  } , []).reverse().slice(0, 3)
}