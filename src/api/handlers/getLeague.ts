/* get one league via [id] and [season] params  */
import { UnavailableData } from "@/common/Errors";
import qs from "qs"
import availableLeagues from "../functions/createLeagues";
import getLeagues from "./getLeagues";

type Params = {
  [k : string]: string | number
}

type response =  {
  id : string
  name : string
  logo : string
  seasons : number[]
}[]


export default async function getLeague(params : Params ){
    if(!params["league"] || !params["season"]) throw new Error("season and id are necessary");
    let league = (await getLeagues() as response).filter(({id, seasons})=>{
      return id == params.league &&  seasons.includes(Number(params.season));
    });

    if(league && league?.length > 0){
      return league[0];
    } else {
      throw new Error(
        `league with id: ${params.league} is not available or season : ${params.season} is not yet reached or no longer valid`
        );
    }
}