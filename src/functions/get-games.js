const oddsApi = require("./odds-api");
const getTeamAbbreviation = require("./get-team-abbreviation");
const { oddsApiKey } = require("../config.json");
const { setGame } = require("../data/games");

const getSpread = (markets) => {
  const spreads = markets.filter((market) => market.key === "spreads")[0];
  if (!spreads) {
    return null;
  }
  return {
    home: {
      price: spreads.outcomes[1].price,
      point: spreads.outcomes[1].point,
    },
    away: {
      price: spreads.outcomes[0].price,
      point: spreads.outcomes[0].point,
    },
  };
};

async function getGames() {
  var games = [];
  const response = await oddsApi(oddsApiKey);
  try {
    await await Promise.all(
      response.map(async (dirtyGame) => {
        const newGame = {
          home: getTeamAbbreviation(dirtyGame.home_team),
          away: getTeamAbbreviation(dirtyGame.away_team),
          datetime: new Date(dirtyGame.commence_time),
        };
        await setGame(newGame); // this is a side effect. side effects are bad.

        const spread = getSpread(dirtyGame.bookmakers[0].markets);
        if (spread) {
          newGame.odds = {
            spread: spread,
          };
          // TO DO: only show games for TONIGHT
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
