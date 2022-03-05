const setBet = async (client, bet) => {
  try {
    const collection = client.db("betting").collection("bets");
    await collection.insertOne(bet);
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = { setBet };
