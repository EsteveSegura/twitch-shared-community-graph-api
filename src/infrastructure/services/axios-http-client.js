class AxiosHttpClient {
  constructor({axios}) {
    this.axios = axios;
  }

  async post({url, body, config}) {
    return await this.axios.post(url, body, config);
  }

  async get({url, config}) {
    console.log('::GET', url);
    return await this.axios.get(url, config);
  }
}

module.exports = AxiosHttpClient;
