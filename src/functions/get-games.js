const oddsApi = require("./odds-api");
const getTeamAbbreviation = require("./get-team-abbreviation");
const { oddsApiKey } = require("../config.json");
const { setGame } = require("../data/games");
const { isWithinHours } = require("../util/dates");

const getSpread = (markets, home, away) => {
  const spreads = markets.filter((market) => market.key === "spreads")[0];
  if (!spreads) {
    return null;
  }
  const home_odds = spreads.outcomes.filter(
    (outcome) => outcome.name === home
  )[0];
  const away_odds = spreads.outcomes.filter(
    (outcome) => outcome.name === away
  )[0];
  return {
    home: {
      price: home_odds.price,
      point: home_odds.point,
    },
    away: {
      price: away_odds.price,
      point: away_odds.point,
    },
  };
};

async function getGames() {
  var games = [];
  const response = await oddsApi(oddsApiKey);
  try {
    await await Promise.all(
      response.map(async (dirtyGame) => {
        if (!isWithinHours(new Date(dirtyGame.commence_time), 12)) {
          return; // Only get games within 12 hours from now
        }

        const newGame = {
          home: getTeamAbbreviation(dirtyGame.home_team),
          away: getTeamAbbreviation(dirtyGame.away_team),
          datetime: new Date(dirtyGame.commence_time),
        };
        setGame(newGame); // this is a side effect. side effects are bad.

        const spread = getSpread(
          dirtyGame.bookmakers[0].markets,
          dirtyGame.home_team,
          dirtyGame.away_team
        );
        if (spread) {
          newGame.odds = {
            spread: spread,
          };
          games.push(newGame);
        }
        return;
      })
    );
  } catch (error) {
    console.log(error);
  }
  return games;
}

module.exports = getGames;
