const axios = require("axios");
const { addGame } = require("../data/games");

axios.get("http://data.nba.net/prod/v1/2021/schedule.json").then((response) => {
  response.data.league.standard.map(async (game) => {
    console.log(game);
    await setTimeout(addGame(game), 100);
  });
});
