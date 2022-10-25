#API url
https://v3.football.api-sports.io
#API key

#colors

primary : #6724bc
secondary : #00FA73
danger : #FF3572

tune-dark : #33293A
tune-darker : #251C2C

tune-light : #FFDBFF
tune-lighter : #FFF1FB

#NOTES

you can get leagues only by giving a country name or "world" if
we want a international championship or cup

example :
"https://v3.football.api-sports.io/leagues?season=2019&country=england&type=league";

England leagues (primer...) season : 2019/2020

#standings
path : /standings

params : {
 league : ?league=xx
 season : ?season=xxxx **required**
 team : ?team=xx

#Leagues
path : /leagues


**primer league** 39
**Calcio seria A** 135
**La liga** 140
**Bundes Liga** 78
**Al Botola Pro** 200

#Countries
England 0000
France 0000
Spain 0000
Germany 0000
Morocco 0000

#Cups
world 1
England 0000
France 0000
Spain 0000
Germany 0000
Morocco 0000

#Championships
**UEFA Champions league** 2
**UEFA Europa league** 3

**COPA AMERICA** 9
**CONMEBOL sudamericana** 11

**Caf Champions league** 12
**AFC (asia) Champions league** 17

# API request/response

**team** :
  params = {season: xxxx, country?: xx, league: xxx}
	[http]request = "https://v3.football.api-sports.io/teams?id=33"
	result = **Get one team from one team {id}**
	response = 
	{

	    "get": "teams",
	    "parameters": 

	{

	    "id": "33"

	},
	"errors": [ ],
	"results": 1,
	"paging": 
	{

	    "current": 1,
	    "total": 1

	},
	"response": 
	[

	{

	    "team": 

	{

	    "id": 33,
	    "name": "Manchester United",
	    "code": "MUN",
	    "country": "England",
	    "founded": 1878,
	    "national": false,
	    "logo": "https://media.api-sports.io/football/teams/33.png"

	},
	"venue": 

		    {
		        "id": 556,
		        "name": "Old Trafford",
		        "address": "Sir Matt Busby Way",
		        "city": "Manchester",
		        "capacity": 76212,
		        "surface": "grass",
		        "image": "https://media.api-sports.io/football/venues/556.png"
		    }
		}
	    ]

	}

**standings** : 
	params = {season : xxxx, team?: xx, league?: xxx}
	result = get all standings for that team or league in that particular season
	response = {

		    "get": "standings",
		    "parameters": 

		{

		    "league": "39",
		    "season": "2019"

		},
		"errors": [ ],
		"results": 1,
		"paging": 
		{

		    "current": 1,
		    "total": 1

		},
		"response": 
		[

		{

		    "league": 

		{

		    "id": 39,
		    "name": "Premier League",
		    "country": "England",
		    "logo": "https://media.api-sports.io/football/leagues/2.png",
		    "flag": "https://media.api-sports.io/flags/gb.svg",
		    "season": 2019,
		    "standings": 

		[

		[

		{

		    "rank": 1,
		    "team": 

		{},
		"points": 70,
		"goalsDiff": 41,
		"group": "Premier League",
		"form": "WWWWW",
		"status": "same",
		"description": "Promotion - Champions League (Group Stage)",
		"all": 
		{

		    "played": 24,
		    "win": 23,
		    "draw": 1,
		    "lose": 0,
		    "goals": 

		    {
			"for": 56,
			"against": 15
		    }

},
		"home": 
		{...},
		"away": 
		{...},
            	"update": "2020-01-29T00:00:00+00:00"
				        }
				    ]
				]
			    }
			}
		    ]

		}
