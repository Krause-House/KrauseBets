var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const setOdds = (game, client) => {
    client.connect((err) => __awaiter(this, void 0, void 0, function* () {
        const collection = client.db("betting").collection("games");
        const filter = {
            home: game.home,
            away: game.away,
            datetime: game.datetime,
        };
        const options = { upsert: true };
        const update = { $set: { odds: game.odds } };
        const result = yield collection.updateDoc(filter, update, options);
        console.log(result);
        client.close();
    }));
};
