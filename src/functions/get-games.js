const axios = require("axios");
const { addGame } = require("../data/games");

const getGames = async () => {
  axios
    .get("http://data.nba.net/prod/v1/2021/schedule.json")
    .then((response) => {
      const todaysGames = response.data.league.standard.filter((game) => {
        const startTime = new Date(game.startTimeUTC);
        const now = new Date();
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() + 16);
        return startTime < cutoff && startTime > now;
      });
      todaysGames.map(async (game) => {
        addGame(game);
      });
    });
};

module.exports = getGames;
