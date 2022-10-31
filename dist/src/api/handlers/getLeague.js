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
/* get one league via [id] and [season] params  */
const qs_1 = __importDefault(require("qs"));
const createLeagues_1 = __importDefault(require("../functions/createLeagues"));
function getLeague(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!/id/igm.test(params) && !/season/igm.test(params))
            throw new Error("season and id are necessary");
        let paramsObj = qs_1.default.parse(params);
        let league = createLeagues_1.default.filter(({ id, seasons }) => {
            return id == paramsObj.id && seasons.includes(Number(paramsObj.season));
        });
        if (league && (league === null || league === void 0 ? void 0 : league.length) > 0) {
            return league[0];
        }
        else {
            throw new Error(`league with id: ${paramsObj.id} is not available or season : ${paramsObj.season} is not yet reached or no longer valid`);
        }
    });
}
exports.default = getLeague;
