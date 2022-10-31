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
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const getStandings_1 = __importDefault(require("./api/handlers/getStandings"));
const getLeagues_1 = __importDefault(require("./api/handlers/getLeagues"));
const getTeams_1 = __importDefault(require("./api/handlers/getTeams"));
let host = "localhost", port = 3000;
let server = http_1.default.createServer({}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.writeHead(200, "OK", {
        "Content-type": "application/json"
    });
    let url = new URL(req.url, `http://${req.headers.host}`);
    try {
        let pathname = url.pathname;
        let params = url.searchParams;
        let paramsString = params.toString();
        switch (pathname) {
            case "/api/standings": {
                try {
                    if (!paramsString)
                        throw new Error("params are necessary");
                    res.end(yield (0, getStandings_1.default)(paramsString));
                }
                catch (error) {
                    console.log(error);
                    res.writeHead(404, undefined, {});
                    res.end(`{error : ${error.message}}`);
                }
                break;
            }
            // get seasons depending on league
            case "/api/leagues": {
                try {
                    let leagues = yield (0, getLeagues_1.default)();
                    res.end(JSON.stringify(leagues, null, 2));
                }
                catch (error) {
                    console.log(error);
                    res.writeHead(404, undefined, {});
                    res.end(`{error : ${error.message}}`);
                }
                break;
            }
            case "/api/teams": {
                try {
                    if (!paramsString)
                        throw new Error("params are necessary");
                    res.end(yield (0, getTeams_1.default)(paramsString));
                }
                catch (error) {
                    console.log(error);
                    res.writeHead(404, undefined, {});
                    res.end(`{error : ${error.message}}`);
                }
                break;
            }
            // case "/api/league" : {
            //   try {
            //     if(!paramsString) throw new Error("params are necessary")
            //     let league = await getLeague(paramsString);
            //     res.end(JSON.stringify(league, null, 2));
            //   } catch (error) {
            //     console.log(error);
            //     res.writeHead(404, undefined, {});
            //     res.end(`{error : ${(error as Error).message}}`)
            //   }
            //   break;
            // }
            default:
                res.writeHead(404);
                res.end("{error : not implemented}");
                break;
        }
    }
    catch (error) {
        console.log(error);
        res.writeHead(500);
        res.end(`{error : sorry for the inconvenience}`);
    }
}));
server.listen(port, host, undefined, () => {
    console.log("listening at port " + port);
});
