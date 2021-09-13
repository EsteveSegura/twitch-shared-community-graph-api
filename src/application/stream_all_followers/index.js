const StreamAllFollowersResponse = require('./stream-all-followers-response');
const TwitchFollower = require('../../domain/twitch-follower/twitch-follower');

class streamAllFollowers {
  constructor({idGenerator, helixClient}) {
    this.idGenerator = idGenerator;
    this.helixClient = helixClient;
  }

  async get({id, currentNextPage}) {
    const {follows: followers,
      _total: totalFollowers,
      _cursor: nextPage} = await this.helixClient.getFollower(id, currentNextPage);

    const followersOfUser = followers.map((follow) =>
      new TwitchFollower({
        id: follow.user._id,
        nickName: follow.user.display_name,
        followers: [],
      }).toObject()
    );

    const User = new TwitchFollower({
      id,
      nickName: await this._getStreamerNickName(id),
      followers: followersOfUser,
    });

    return new StreamAllFollowersResponse({
      id: User.id,
      nickName: User.nickName,
      followers: User.followers,
      totalFollowers, nextPage,
    });
  }

  async _getStreamerNickName(id) {
    const getStreamerData = await this.helixClient.getInfoAboutId(id);

    return getStreamerData.data[0].broadcaster_name;
  }
}

module.exports = streamAllFollowers;
