import { TeamMin } from "../Team"


export default interface IFixture {
  "fixture": {
    "id": number,
    "referee": string,
    "timezone": string,
    "date": string,
    "timestamp": number,
    "periods": {
      "first": number,
      "second": number
    },
    "venue": {
      "id": number | null,
      "name": string,
      "city": string
    },
    "status": {
      "long": string,
      "short": string,
      "elapsed": number
    }
  },
  "league": {
    "id": 1,
    "name": string,
    "country": string,    
    "logo": string,
    "flag": string | null,
    "season": number,
    "round": string
  },
  "teams": {
    "home": {
      "id": number,
      "name": string,
      "logo": string,
      "winner": any | null
    },
    "away": {
      "id": number,
      "name": string,
      "logo": string,
      "winner": any | null
    }
  },
  "goals": {
    "home": number,
    "away": number
  },
  "score": {
    "halftime": {
      "home": number,
      "away": number
    },
    "fulltime": {
      "home": number,
      "away": number
    },
    "extratime": {
      "home": any | null,
      "away": any | null
    },
    "penalty": {
      "home": any | null,
      "away": any | null
    }
  }
} 
