import { leaguesIds } from "../leaguesIds";
import callApi from "../callApi";
import {default as leaguesJSON} from  "../../out/leagues.json"

type response = {
  leagues : {
    id : string
    name : string
    logo : string
    seasons : number[]
  }[]
}

let data : response["leagues"][0][] = [];

let url = "/leagues";

async function makeLeagues(){
  try {
    for(let i = 0; i < leaguesIds.length; i++){
      let params = {id : leaguesIds[i]};
      let res = await callApi({url, params})    
      let json = JSON.parse(res);
      let jsonRes = json.response[0];
      let allSeasons : {year : number}[] = jsonRes.seasons;
      let seasonsVals : number[] = allSeasons.slice(-3).reduce((prev : number[],curr ,i)=>{
        prev[i] = curr.year;
        return prev
      }, [])
      let extracted : response["leagues"][0] = {id : jsonRes.league.id, logo : jsonRes.league.logo, name : jsonRes.league.name, seasons : seasonsVals}
      data.push(extracted);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

let availableLeagues = makeLeagues();
// let availableLeagues = leaguesJSON; // mock

export default availableLeagues;