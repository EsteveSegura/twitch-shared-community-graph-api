const awilix = require('awilix');

const {v4: uuidv4} = require('uuid');
const axios = require('axios');
const crypto = require('crypto');
const AxiosHttpClient = require('./infrastructure/services/axios-http-client');
const RestHelixClient = require('./infrastructure/services/rest-helix-client');
const idGenerator = require('./domain/services/id-generator');
const tokenGenerator = require('./domain/services/token-generator');
const getAllFollowers = require('./application/get_all_followers/index');
const streamAllFollowers = require('./application/stream_all_followers/index');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  uuidv4: awilix.asValue(uuidv4),
  axios: awilix.asValue(axios),
  crypto: awilix.asValue(crypto),
  httpClient: awilix.asClass(AxiosHttpClient),
  helixClient: awilix.asClass(RestHelixClient),
  idGenerator: awilix.asFunction(idGenerator),
  tokenGenerator: awilix.asFunction(tokenGenerator),
  getAllFollowers: awilix.asClass(getAllFollowers),
  streamAllFollowers: awilix.asClass(streamAllFollowers),
});

module.exports = container;
