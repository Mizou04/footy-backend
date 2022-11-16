import { UnavailableData } from "@/common/Errors";
import makeLeagues from "../functions/createLeagues"

export default async function getLeagues(){
  try {
    let leagues = await makeLeagues();
    if(!leagues || !leagues.length){
      throw new UnavailableData(UnavailableData.type + " : Please Retry Later")
    }    
    return leagues;
  } catch (error) {
    console.log(error);
    throw error
  }
}

