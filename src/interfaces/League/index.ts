import { Country } from "../Country";
import { Player } from "../Player";

type LeagueProps = {
  name : string;
  readonly id : string | number;
  readonly country : Country;
  teamsIDs : string[] | number[];
  rankingID : string | number;
  goalsIDs : string[] | number[];
  topScorers : Player[];
  season : number;
  currentWeek : number;
  logo : string;
}

