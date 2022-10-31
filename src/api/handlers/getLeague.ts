/* get one league via [id] and [season] params  */
import qs from "qs"
import availableLeagues from "../functions/createLeagues";

type Params = {
  id : string | number
  season : string | number
}

export default async function getLeague(params : string){
    if(!/id/igm.test(params) && !/season/igm.test(params)) throw new Error("season and id are necessary");
    let paramsObj : Params = qs.parse(params) as Params;
    let league = availableLeagues.filter(({id, seasons})=>{
      return id == paramsObj.id &&  seasons.includes(Number(paramsObj.season));
    });
    if(league && league?.length > 0){
      return league[0];
    } else {
      throw new Error(
        `league with id: ${paramsObj.id} is not available or season : ${paramsObj.season} is not yet reached or no longer valid`
        );
    }
}