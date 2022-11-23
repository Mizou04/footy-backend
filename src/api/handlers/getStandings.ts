import callApi from "../callApi";
import { leaguesIds } from "../leaguesIds";
import getSeasons from "./getSeasons";

/**
 * leagues ids and seasons are restricted to certain ids and seasons respectively
 * 
*/

// params : season + league => season=2022&league=200

export default async function getStandings(params : {[k : string] : string | number}){
  if(!params["league"] && !params["season"]) throw new Error("season and league id are necessary");
  
  if(leaguesIds.includes(params["league"] as string)){
  
    let pathname = "/standings";
    let data : string = await callApi({pathname, params});
    return JSON.parse(data).response;
    
  }
}

