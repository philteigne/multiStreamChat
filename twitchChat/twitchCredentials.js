const twitchAPIKey = process.env.TWITCH_API_KEY;
const tmi = require('tmi.js');

const opts = {
  identity: {
    username: 'yttbot',
    password: twitchAPIKey
  },
  channels: [
    'ledfalcon'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

module.exports = { client, opts };