const InvalidTwitchFollowerError = require('./error/invalid-twitch-follower-error');

class Test {
  constructor({id, nickName, followers}) {
    this.id = id;
    this.nickName = nickName;
    this.followers = followers;
  }

  toObject() {
    return {
      id: this.id,
      nickName: this.nickName,
      followers: this.followers,
    };
  }

  set id(id) {
    if (!id) {
      throw new InvalidTwitchFollowerError('Field id cannot be empty');
    }

    this._id = id;
  }

  get id() {
    return this._id;
  }

  set nickName(nickName) {
    if (!nickName) {
      throw new InvalidTwitchFollowerError('Field nickName cannot be empty');
    }

    this._nickName = nickName;
  }

  get nickName() {
    return this._nickName;
  }

  set followers(followers) {
    if (!Array.isArray(followers)) {
      throw new InvalidTwitchFollowerError('Field followers cannot be empty');
    }

    this._followers = followers;
  }

  get followers() {
    return this._followers;
  }
}

module.exports = Test;

