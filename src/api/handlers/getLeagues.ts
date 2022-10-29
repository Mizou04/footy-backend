import availableLeagues from "../functions/createLeagues"

export default async function getLeagues(){
  try {
    let leagues = availableLeagues;
    return leagues;
  } catch (error) {
    console.log(error);
    throw error
  }
}

