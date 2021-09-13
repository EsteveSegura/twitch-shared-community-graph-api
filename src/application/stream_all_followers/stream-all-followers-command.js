class StreamAllFollowersCommand {
  constructor({id, nextPage = null}) {
    this.id = id;
    this.nextPage = nextPage;
  }
}

module.exports = StreamAllFollowersCommand;
