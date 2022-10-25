import "dotenv/config";
import util from "util";

const HOSTNAME = "v3.football.api-sports.io";
// const LINK = "https://v3.football.api-sports.io/";

const HEADERS = {
  "x-apisports-key" : process.env.API_KEY,
}

export default {HOSTNAME, HEADERS}