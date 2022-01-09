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
      console.log("Odds requested, deferring reply");
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

        console.log("Odds received, editing reply");
        await interaction.editReply({
          content: reply,
          ephemeral: true,
        });
        console.log("Reply edited");

        console.log("Interaction ended ----------------------------");
      });
    } catch (error) {
      console.log(error);
    }
  },
};
