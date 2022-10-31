"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
require("dotenv/config");
const HOSTNAME = "v3.football.api-sports.io";
const HEADERS = {
    "x-apisports-key": process.env.API_KEY,
};
const PROTOCOL = "https:";
/**
 *
 * @param input.url is actually the pathname + params and not the whole url
 * @return
 */
function callApi(input) {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            headers: HEADERS,
            protocol: PROTOCOL,
            hostname: HOSTNAME,
            path: input.url,
        };
        let request = https_1.default.request(options);
        request.on("response", (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve(data);
            });
        }).on("error", (err) => { console.log(err); reject(err); });
        request.end();
    });
}
exports.default = callApi;
