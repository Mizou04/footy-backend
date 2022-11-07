import callApi from "../callApi";
import { leaguesIds } from "../leaguesIds";
import qs from "qs"
import availableLeagues from "../functions/createLeagues";
import getLeague from "./getLeague";

/**
 * leagues ids and seasons are restricted to certain ids and seasons respectively
 * 
*/

// params : season + league => season=2022&league=200

export default async function getStandings(params : {[k : string] : string | number}){
  if(!params["league"] && !params["season"]) throw new Error("season and league id are necessary");

  let league = await getLeague(params);
  
  if(league.id){
    let url = "/standings";
    let data : string = await callApi({url, params});
    
    return data;
  }
}

