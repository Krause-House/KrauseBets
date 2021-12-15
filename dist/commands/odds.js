var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder } from "@discordjs/builders";
import { getGames } from "../functions";
module.exports = {
    data: new SlashCommandBuilder()
        .setName("odds")
        .setDescription("Get the odds for tonight's games.")
        .addSubcommand((subcommand) => subcommand
        .setName("spread")
        .setDescription("Bet against the spread for a game.")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            getGames().then((games) => __awaiter(this, void 0, void 0, function* () {
                var reply = "**Tonight's Spread Odds**\n";
                games.map((game) => {
                    reply += `
        ${game.away} @ ${game.away}
          \t${game.home}: ${game.odds.spread.home}
          \t${game.away}: ${game.odds.spread.away}
        `;
                });
                yield interaction.reply({
                    content: reply,
                    ephemeral: true,
                });
            }));
        });
    },
};
