import standing from "@/interfaces/Standing";
import IResponse from "./response";

export default interface IStandingsResponse extends IResponse{
  get : "standings",
  parameters : {
    season : string,
    league : string,
    [k : symbol] : string
  },
  response : standing[]
}