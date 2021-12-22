const newProposal = async (proposal) => {
  try {
    proposal.react("👍");
    proposal.react("👎");

    if (proposal.type !== "THREAD_CREATED") {
      const thread = await proposal.startThread({
        name: proposal.content.split("\n")[0],
        autoArchiveDuration: 60 * 24,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = newProposal;
