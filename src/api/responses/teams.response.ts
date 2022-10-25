import Team from "@/entities/Team";
import Venue from "@/entities/Venue";
import IResponse from "./response";


export default interface ITeamsResponse extends IResponse{
  get : "teams",
  parameters : {
    season : string,
    league : string,
    [key : string] : string,
  },
  response : {team : Team, venue : Venue}[]
}
