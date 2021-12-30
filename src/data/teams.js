const { MongoClient } = require("mongodb");
const { mongoConnectionString } = require("../config.json");

const addTeam = async (team) => {
  const uri = mongoConnectionString;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const collection = client.db("betting").collection("teams");

    const filter = {
      teamId: team.teamId,
    };
    const options = { upsert: true };
    const update = {
      $set: team,
    };

    await collection.updateOne(filter, update, options);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

module.exports = { addTeam };
