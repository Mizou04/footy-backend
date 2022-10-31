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
// import QS_ from "querystring"
const readFile_1 = __importDefault(require("./readFile"));
const qs_1 = __importDefault(require("qs"));
const path_1 = __importDefault(require("path"));
function default_1(input) {
    return __awaiter(this, void 0, void 0, function* () {
        input.url += input.url[input.url.length - 1] !== "?" ? "?" : '';
        let paramsObj = qs_1.default.parse(input.params);
        if (!paramsObj["id"] || !paramsObj["season"])
            throw new Error("season and id are necessary");
        let file = yield (0, readFile_1.default)(path_1.default.resolve(__dirname, `../out/league-${paramsObj["id"]}-${paramsObj["season"]}.json`));
        return file;
    });
}
exports.default = default_1;
