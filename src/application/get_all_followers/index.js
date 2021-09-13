const GetAllFollowersResponse = require('./get-all-followers-response');
const TwitchFollower = require('../../domain/twitch-follower/twitch-follower');

class getAllFollowers {
  constructor({idGenerator, helixClient}) {
    this.idGenerator = idGenerator;
    this.helixClient = helixClient;
  }

  async get({id}) {
    const {nickName, followers} = await this.helixClient.getAllFollowers(id);
    const followersOfUser = followers.map((follower) => new TwitchFollower({
      id: follower._id,
      nickName: follower.display_name,
      followers: [],
    }).toObject());
    const User = new TwitchFollower({id, nickName, followers: followersOfUser});

    return new GetAllFollowersResponse({id: User.id, nickName: User.nickName, followers: User.followers});
  }
}

module.exports = getAllFollowers;
