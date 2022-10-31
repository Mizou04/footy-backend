import { TeamMin } from "../Team";
export default interface standing {
    "rank": number;
    "team": TeamMin;
    "points": number;
    "goalsDiff": number;
    "group": string;
    "form": string;
    "status": string;
    "description": string;
    "all": {
        "played": number;
        "win": number;
        "draw": number;
        "lose": number;
        "goals": {
            "for": number;
            "against": number;
        };
    };
    "home": {
        "played": number;
        "win": number;
        "draw": number;
        "lose": number;
        "goals": {
            "for": number;
            "against": number;
        };
    };
    "away": {
        "played": number;
        "win": number;
        "draw": number;
        "lose": number;
        "goals": {
            "for": number;
            "against": number;
        };
    };
    "update": string;
}
