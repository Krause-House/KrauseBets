const axios = require("axios");

async function oddsApi(apiKey) {
  return await axios
    .get(
      "https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&markets=h2h,spreads&oddsFormat=american",
      {
        params: {
          apiKey: apiKey,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
}

module.exports = oddsApi;
