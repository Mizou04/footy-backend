// get teams from a [league] and [season] and [id] params

// this endpoint returns both list of teams or one single team (if id exists)

/** cache opportunity */
// WE CAN CACHE THE RESULT OF ALL TEAMS THEN RETURN ONE TEAM IF FETCHED WITHOUT CALLING THE API AGAIN  

import callApi from "../callApi";
import { leaguesIds } from "../leaguesIds";
import getLeague from "./getLeague";

type Tparams = {[k : string] : string | number};


const URL = "/teams";

export default async function getTeams(params : Tparams){
  if(!params["season"] || !params["league"])
    throw new Error("season and league are necessary");
    
  // restrict to only available leagues on the app
  if(!leaguesIds.includes(params["league"] as string))
    throw new Error("cannot get team from this league or league is invalid");
  let league = await getLeague(params);
    
  if(league.id && !league.seasons.includes(Number(params["season"] as string)))
  {
      throw new Error("cannot get team from this league or season, or either season league is invalid");
  }
  let data = await callApi({url : URL, params});
  return JSON.parse(data).response;
}
