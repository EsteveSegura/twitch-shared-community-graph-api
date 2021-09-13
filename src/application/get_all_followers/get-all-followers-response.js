class GetAllFollowersResponse {
  constructor({id, nickName, followers}) {
    this.id = id;
    this.nickName = nickName;
    this.followers = followers;
  }
}

module.exports = GetAllFollowersResponse;
