import IFixture from "@/interfaces/Fixture";
import IResponse from "./response";

export default interface IFixturesResponse extends IResponse {
  get: "",
  parameters: {
    season : string,
    league : string,
    date?: string, // of form Y-M-D
    next?: string,
    from?: string,
    to?: string,
  },
  errors: any[],
  results: number,
  paging: {
    current: number,
    total: number
  },
  response: IFixture[]
}

