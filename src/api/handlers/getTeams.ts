// get teams from a [league] and [season] and [id] params

// this endpoint returns both list of teams or one single team (if id exists)

/** cache opportunity */
// WE CAN CACHE THE RESULT OF ALL TEAMS THEN RETURN ONE TEAM IF FETCHED WITHOUT CALLING THE API AGAIN  

import callApi from "../callApi";
import qs from "qs"
import { leaguesIds } from "../leaguesIds";
import getLeague from "./getLeague";

type Tparams = string;


const URL = "/teams";

export default async function getTeams(params : Tparams){
  let paramsObj = qs.parse(params);
  if(!paramsObj.hasOwnProperty("season") || !paramsObj.hasOwnProperty("league"))
    throw new Error("season and league are necessary");
    
  // restrict to only available leagues on the app
  let leagueParamsObj = {
    season : paramsObj.season,
    id : paramsObj.league
  };
  if(!leaguesIds.includes(paramsObj["league"] as string))
    throw new Error("cannot get team from this league or league is invalid");
  let league = await getLeague(qs.stringify(leagueParamsObj));
  if(league
    && !league.seasons.includes(Number(paramsObj["season"] as string))
    ){
      throw new Error("cannot get team from this season or season is invalid");
  }
  return (await callApi({url : URL + "?" + params}));
}