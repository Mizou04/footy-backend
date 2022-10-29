import callApi from "../callApi";
import { getLast3RegularSeasons, getLast3WorldCupsSeasons } from "./helpers/getSeasons";
import { leaguesIds } from "../leaguesIds";
import qs from "qs"


/**
 * ids and seasons are restricted to certain ids and seasons respectively
 * 
*/

// params : season + id + current

export default async function getStandings(params : string){
  let url = "/standings";
  let paramsObj = qs.parse(params);
  let seasons = getLast3RegularSeasons(Number(paramsObj["season"]));
  // if it's world cup
  if(paramsObj["league"] == "1"){
    seasons = getLast3WorldCupsSeasons();
  };
  
  if(!/season/igm.test(params)) 
    throw new Error("season is required");
  if(!/league/igm.test(params)) 
    throw new Error("league id is required");
  if(!seasons.includes(Number(paramsObj["season"])) || !leaguesIds.includes(paramsObj["league"] as string))
    throw new Error("page not found");

  delete paramsObj.current;
  let apiParams = qs.stringify(paramsObj);

  let data : string = await callApi({url : url + "?" + apiParams});

  return data;
}

