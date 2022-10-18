var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { oddsAPI, getTeamAbbreviation } from ".";
const getSpread = (markets) => {
  const spreads = markets.filter((market) => market.key === "spreads")[0];
  return {
    home: {
      price: spreads.outcomes[0].price,
      point: spreads.outcomes[0].point,
    },
    away: {
      price: spreads.outcomes[0].price,
      point: spreads.outcomes[0].point,
    },
  };
};
export default function () {
  return __awaiter(this, void 0, void 0, function* () {
    var games = [];
    const response = yield oddsAPI(process.env.oddsApiKey);
    try {
      response.map((game) => {
        games.push({
          home: getTeamAbbreviation(game.home_team),
          away: getTeamAbbreviation(game.away_team),
          datetime: new Date(game.commence_time),
          odds: {
            spread: getSpread(game.bookmakers[0].markets),
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
    return games;
  });
}
