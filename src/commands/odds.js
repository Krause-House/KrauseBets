const { SlashCommandBuilder } = require("@discordjs/builders");
const getGameOdds = require("../functions/get-game-odds");

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
    try {
      await interaction.deferReply({ ephemeral: true });
      getGameOdds().then(async (games) => {
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
    } catch (error) {
      console.log(error);
    }
  },
};
