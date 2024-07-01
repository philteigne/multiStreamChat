const oauthToken = "62uiyq9bnl01uviwdjxzdh5voozyoc";
const clientID = "gp762nuuoqcoxypju8c569th9wz7q5";
// const oauthToken = process.env.YTT_OAUTH;

const tmi = require('tmi.js');

// Create a client with our options
// const client = new tmi.client(opts);

const buildClient = (username, password, channels) => {
  const opts = {
    identity: {
      username: username, // bot username
      password: password, // oauthToken
    },
    channels: channels, // [array of channels]
  };

  const client = new tmi.client(opts);

  return client;
}

module.exports = { buildClient };