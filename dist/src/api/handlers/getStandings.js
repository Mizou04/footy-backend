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
const callApi_1 = __importDefault(require("../callApi"));
const getLeague_1 = __importDefault(require("./getLeague"));
/**
 * leagues ids and seasons are restricted to certain ids and seasons respectively
 *
*/
// params : season + league => season=2022&league=200
function getStandings(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!/league/igm.test(params) && !/season/igm.test(params))
            throw new Error("season and league id are necessary");
        let league = yield (0, getLeague_1.default)(params.replace(/league/, "id"));
        if (league) {
            let url = "/standings";
            let data = yield (0, callApi_1.default)({ url: url + "?" + params });
            return data;
        }
    });
}
exports.default = getStandings;
