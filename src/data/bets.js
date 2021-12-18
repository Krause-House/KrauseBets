const { MongoClient } = require("mongodb");
const { mongoConnectionString } = require("../config.json");

const setBet = async (bet) => {
  const uri = mongoConnectionString;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB.");
    const collection = client.db("betting").collection("bets");
    await collection.insertOne(bet);
    console.log("Successfully inserted bet to MongoDB.");
    client.close();
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

module.exports = { setBet };
