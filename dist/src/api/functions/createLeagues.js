"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaguesIds_1 = require("../leaguesIds");
const callApi_1 = __importDefault(require("../callApi"));
const leagues_json_1 = __importDefault(require("../../out/leagues.json"));
let data = [];
function makeLeagues() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let i = 0; i < leaguesIds_1.leaguesIds.length; i++) {
                let res = yield (0, callApi_1.default)({ url: "/leagues" + "?" + `id=${leaguesIds_1.leaguesIds[i]}` });
                let json = JSON.parse(res);
                let jsonRes = json.response[0];
                let allSeasons = jsonRes.seasons;
                let seasonsVals = allSeasons.slice(-3).reduce((prev, curr, i) => {
                    prev[i] = curr.year;
                    return prev;
                }, []);
                let extracted = { id: jsonRes.league.id, logo: jsonRes.league.logo, name: jsonRes.league.name, seasons: seasonsVals };
                data.push(extracted);
            }
            return data;
        }
        catch (error) {
            console.log(error);
        }
    });
}
// let availableLeagues = makeLeagues();
let availableLeagues = leagues_json_1.default;
exports.default = availableLeagues;
