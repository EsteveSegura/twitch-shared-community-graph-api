const {clientId, secretId} = require('../config').twitch;

class RestHelixClient {
  constructor({httpClient}) {
    this._httpClient = httpClient;
  }

  async getInfoAboutId(channelId) {
    try {
      const token = await this._getHelixToken();
      const url = `https://api.twitch.tv/helix/channels?broadcaster_id=${channelId}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Client-Id': clientId,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.twitchtv.v5+json',
        },
      };

      const helixResponse = await this._httpClient.get({url, config});
      // const { broadcaster_name: screenName, broadcaster_login: loginName } = helixResponse.data.data[0];

      return helixResponse.data;
    } catch (error) {
      return '';
    }
  }

  async _getHelixToken() {
    // eslint-disable-next-line max-len
    const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secretId}&grant_type=client_credentials`;
    const token = await this._httpClient.post({url});

    return token.data.access_token;
  }

  async getFollower(id, cursor = null) {
    const token = await this._getHelixToken();
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Client-Id': clientId,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.twitchtv.v5+json',
      },
    };
    const url = `https://api.twitch.tv/kraken/channels/${id}/follows?limit=100${!cursor ? '' : '&cursor=' + cursor}`;
    // eslint-disable-next-line max-len
    const response = await this._httpClient.get({url, config});

    return response.data;
  }

  async getAllFollowers(id) {
    const allFollowers = [];
    let currentCursor = '';

    const getOneFollowerPage = await this.getFollower(id);
    currentCursor = getOneFollowerPage._cursor;

    // First page
    for (const followers of getOneFollowerPage.follows) {
      allFollowers.push(followers.user);
    }

    // The other pages
    for (let i = 0; i <= Math.floor((getOneFollowerPage._total / 100) - 1); i++) {
      const currentPage = await this.getFollower(id, currentCursor);
      for (const followers of currentPage.follows) {
        allFollowers.push(followers.user);
      }

      currentCursor = currentPage._cursor;
    }

    const relationShipTo = await this.getInfoAboutId(id);
    return {followers: allFollowers, nickName: relationShipTo.data[0].broadcaster_name, id: id};
  }
}

module.exports = RestHelixClient;
