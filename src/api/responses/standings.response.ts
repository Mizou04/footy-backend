import standing from "@/entities/Standing";
import IResponse from "./response";

export default interface IStandingsResponse extends IResponse{
  get : "standings",
  parameters : {
    season : string,
    [k : symbol] : string
  },
  response : standing[]
}