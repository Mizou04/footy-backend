import Entity from "@/common/BaseEntity";

type Match = {
  season : number;
  leagueID : number | string;
  countryID : number | string;
  week : number;
  date : Date;
  home : string | number;
  visitor : string | number;
}
