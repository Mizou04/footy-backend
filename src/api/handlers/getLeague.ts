/* get one league via [id]*/
import callApi from "../callApi";

type Params = {
  [k : string]: string | number
}


export default async function getLeague(params : Params){
  if(!params["id"]) throw new Error("league id is necessary");
  let pathname = "/leagues";
  let serverResponse = JSON.parse(await callApi({pathname, params : {id : params["id"]}}));
  let response : any[] = serverResponse.response;

  if(response && response.length > 0){
    return response[0];
  } else {
    throw new Error(
      `league with id: ${params.league} is not available or season : ${params.season} is not yet reached or no longer valid`
    );
  }
}