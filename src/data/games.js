const { MongoClient } = require("mongodb");
const { mongoConnectionString } = require("../config.json");

const addGame = async (game) => {
  const uri = mongoConnectionString;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const collection = client.db("betting").collection("games");

    const filter = {
      gameUrlCode: game.gameUrlCode,
    }; // won't insert if already exists
    const options = { upsert: true };
    const update = {
      $set: game,
    };

    await collection.updateOne(filter, update, options);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const getNextGame = async (team) => {
  const uri = mongoConnectionString;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const collection = client.db("betting").collection("games");
    const query = {
      $and: [
        {
          gameUrlCode: {
            $regex: team,
          },
        },
        {
          startTimeUTC: {
            // TO DO: only show games happening TONIGHT
            $gte: new Date().toISOString(), // only show games that have not yet started
          },
        },
      ],
    };
    const options = {
      // sort returned documents in ascending date order
      sort: { datetime: 1 },
    };
    const game = await collection.findOne(query, options);
    return game;
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

module.exports = { setGame, addGame, getNextGame };
