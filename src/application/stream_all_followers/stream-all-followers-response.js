class StreamAllFollowersResponse {
  constructor({id, nickName, followers, totalFollowers = null, nextPage = null}) {
    this.id = id;
    this.nickName = nickName;
    this.followers = followers;
    this.totalFollowers = totalFollowers;
    this.nextPage = nextPage;
  }
}

module.exports = StreamAllFollowersResponse;
