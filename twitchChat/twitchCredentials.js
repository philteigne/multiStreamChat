const { oauthToken } = require('../twitchAPICredentials');
const tmi = require('tmi.js');

const opts = {
  identity: {
    username: 'yttbot',
    password: oauthToken
  },
  channels: [
    'ledfalcon'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

module.exports = { client, opts };