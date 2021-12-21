const newProposal = async (proposal) => {
  proposal.react("👍");
  proposal.react("👎");

  if (proposal.type !== "THREAD_CREATED") {
    const thread = await proposal.startThread({
      name: proposal.content.split("\n")[0],
      autoArchiveDuration: 60 * 24,
    });
  }
};

module.exports = newProposal;
