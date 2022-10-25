import { Country } from "../Country";
import { Team } from "../Team";

export type Player = {
  id : string | number;
  name : string;
  nationality : Country;
  team : Team
}