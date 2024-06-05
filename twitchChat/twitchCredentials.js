require('dotenv').config();
const oauthToken = process.env.YTT_ACCESS_TOKEN;
const clientID = process.env.YTT_CLIENT_ID;
// const oauthToken = process.env.YTT_OAUTH;
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