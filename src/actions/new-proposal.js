const newProposal = async (client, proposal) => {
  proposal.react("👍");
  proposal.react("👎");
  const thread = await proposal.startThread({
    name: proposal.content.split("\n")[0],
    autoArchiveDuration: 60 * 24,
  });
};

module.exports = newProposal;
