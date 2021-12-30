const axios = require("axios");
const { addTeam } = require("../data/teams");

axios.get("http://data.nba.net/prod/v2/2021/teams.json").then((response) => {
  response.data.league.standard.map((team) => {
    addTeam(team);
  });
});
