"use strict";
// get teams from a [league] and [season] and [id] params
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
// this endpoint returns both list of teams or one single team (if id exists)
/** cache opportunity */
// WE CAN CACHE THE RESULT OF ALL TEAMS THEN RETURN ONE TEAM IF FETCHED WITHOUT CALLING THE API AGAIN  
const callApi_1 = __importDefault(require("../callApi"));
const qs_1 = __importDefault(require("qs"));
const leaguesIds_1 = require("../leaguesIds");
const getLeague_1 = __importDefault(require("./getLeague"));
const URL = "/teams";
function getTeams(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let paramsObj = qs_1.default.parse(params);
        if (!paramsObj.hasOwnProperty("season") || !paramsObj.hasOwnProperty("league"))
            throw new Error("season and league are necessary");
        // restrict to only available leagues on the app
        let leagueParamsObj = {
            season: paramsObj.season,
            id: paramsObj.league
        };
        if (!leaguesIds_1.leaguesIds.includes(paramsObj["league"]))
            throw new Error("cannot get team from this league or league is invalid");
        let league = yield (0, getLeague_1.default)(qs_1.default.stringify(leagueParamsObj));
        if (league
            && !league.seasons.includes(Number(paramsObj["season"]))) {
            throw new Error("cannot get team from this season or season is invalid");
        }
        return (yield (0, callApi_1.default)({ url: URL + "?" + params }));
    });
}
exports.default = getTeams;
