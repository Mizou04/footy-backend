import callApi from "../callApi";
import { leaguesIds } from "../leaguesIds";
import qs from "qs"
import availableLeagues from "../functions/createLeagues";
import getLeague from "./getLeague";
import mockCallApi from "../mockCallApi";

/**
 * leagues ids and seasons are restricted to certain ids and seasons respectively
 * 
*/

// params : season + league => season=2022&league=200

export default async function getStandings(params : string){
  if(!/league/igm.test(params) && !/season/igm.test(params)) throw new Error("season and league id are necessary");

  let league = await getLeague(params.replace(/league/, "id"));
  
  if(league){
    let url = "/standings";
    let data : string = await callApi({url : url + "?" + params});
    
    return data;
  }
}

