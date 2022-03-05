const { SlashCommandBuilder } = require("@discordjs/builders");
const { getNextGame } = require("../data/games");
const { setBet } = require("../data/bets");
const getGameOdds = require("../functions/get-game-odds");
const getTeamAbbreviation = require("../functions/get-team-abbreviation");
const { getTeam } = require("../data/teams");
const { initUser, getUser, setBalance } = require("../data/user");
const { MongoClient } = require("mongodb");
const { mongoConnectionString } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bet")
    .setDescription(
      "Predict the winner of a game (use /odds to see today's lines)."
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("spread")
        .setDescription("Bet against the spread for a game.")
        .addStringOption((option) =>
          option
            .setName("team")
            .setRequired(true)
            .setDescription("Team to bet on (using name in /odds)")
        )
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setRequired(true)
            .setDescription("Conviction of bet")
        )
    ),
  async execute(interaction) {
    const uri = mongoConnectionString;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      console.log("Received bet, deferring reply.");

      await client.connect();

      // parse bet -- this could probably be broken out into its own function
      const options = interaction.options._hoistedOptions;
      const team = getTeamAbbreviation(
        options.filter((option) => option.name === "team")[0].value
      );
      const amount = options.filter((option) => option.name === "amount")[0]
        .value;

      if (amount < 0) {
        await interaction.reply({
          content: `Bet must be greater than 0.`,
          ephemeral: true,
        });
        return;
      } else {
        await interaction.deferReply({ ephemeral: true });
      }

      const discordUser = interaction.user;
      let user = await getUser(client, discordUser.id);
      if (!user) {
        await initUser(client, discordUser);
        user = await getUser(client, discordUser.id);
      }

      if (user.balance < amount) {
        await interaction.editReply({
          content: `Insufficient balance! You have ${user.balance} remaining.`,
          ephemeral: true,
        });
        return;
      }

      const nextGame = await getNextGame(team);
      const homeTeam = await getTeam(nextGame?.hTeam?.teamId);
      const awayTeam = await getTeam(nextGame?.vTeam?.teamId);

      const game = await getGameOdds().then(
        (res) =>
          res.filter((game) => game.home === team || game.away === team)[0]
      );
      if (!game || !nextGame) {
        return await interaction.editReply({
          content: `No games found for ${team}`,
          ephemeral: true,
        });
      }

      const bet = {
        game: nextGame._id,
        user: user.discordId,
        team,
        amount,
        type: "spread",
        odds: {
          point:
            team === homeTeam?.tricode
              ? game.odds.spread.home.point
              : game.odds.spread.away.point,
          price:
            team === awayTeam?.tricode
              ? game.odds.spread.home.price
              : game.odds.spread.away.price,
        },
      };

      // can be broken out into a better "bet" object
      const opposing_team = game.home === team ? game.away : game.home;

      await setBet(client, bet);

      await setBalance(client, user.discordId, user.balance - amount);

      console.log("Bet has been placed.");
      await interaction.editReply({
        content: `Your bet has been placed.`,
        ephemeral: true,
      });
      console.log("Message edited.");

      await interaction.followUp(
        `${
          discordUser.username
        } has placed a ${amount} spread bet on ${team} (${
          bet.odds.point >= 0 ? "+" : ""
        }${bet.odds.point}) over ${opposing_team}.`
      );
      console.log("Public message has been sent.");

      console.log("Interaction ended ---------------------------");
    } catch (error) {
      console.log(error);
      await interaction.editReply({
        content: `Failed to place bet.`,
        ephemeral: true,
      });
    } finally {
      if (client) {
        client.close();
      }
    }
  },
};
