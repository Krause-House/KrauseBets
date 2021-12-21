const { SlashCommandBuilder } = require("@discordjs/builders");
const getGames = require("../functions/get-games");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("odds")
    .setDescription("Get the odds for tonight's games.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("spread")
        .setDescription("Bet on a team with a handicap for projected score.")
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    getGames().then(async (games) => {
      var reply = "**Tonight's Spread Odds**\n";
      if (games.length == 0) {
        reply = "No upcoming games for tonight found.";
      } else {
        games.map((game) => {
          reply += `
          ${game.away} @ ${game.home}
            \t${game.home}: ${game.odds.spread.home.point >= 0 ? "+" : ""}${
            game.odds.spread.home.point
          }
            \t${game.away}: ${game.odds.spread.away.point >= 0 ? "+" : ""}${
            game.odds.spread.away.point
          }
          `;
        });
      }
      await interaction.editReply({
        content: reply,
        ephemeral: true,
      });
    });
  },
};
