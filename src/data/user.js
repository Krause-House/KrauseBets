const initUser = async (client, discordUser) => {
  try {
    const collection = client.db("betting").collection("users");
    await collection.insertOne({
      discordId: discordUser.id,
      username: discordUser.username,
      balance: 1000,
    });
  } catch (err) {
    console.log(err.stack);
  }
};

const getUser = async (client, discordId) => {
  try {
    const collection = client.db("betting").collection("users");
    const query = {
      discordId,
    };
    const user = await collection.findOne(query);
    return user;
  } catch (err) {
    console.log(err.stack);
  }
};

const setBalance = async (client, discordId, amount) => {
  try {
    const collection = client.db("betting").collection("users");
    const filter = {
      discordId,
    };
    const update = {
      $set: { balance: amount },
    };

    await collection.updateOne(filter, update);
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = { initUser, getUser, setBalance };
