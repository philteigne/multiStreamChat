// Loop needs to wait for previous setTimeout to end before starting the next one
// Called every time the bot connects to Twitch chat
const tmi = require('tmi.js');
const ChatMessage = require('../constructors/message')


const listenTwitch = (channel, callback) => {
  const opts = {
    channels: [channel], // [array of channels]
  };

  const client = new tmi.client(opts)

  client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
  });

  client.on('message', (channel, user, message, msg) => {

    const sender = user['display-name']
    const platform = 'Twitch'
    const userStatus = user
    const messageContent = message
    const messageID = user.id
    const timestamp = Date.now()

    callback(
      new ChatMessage(
        platform,
        sender,
        userStatus,
        messageContent,
        messageID,
        timestamp,
      )
    )
  });

  client.connect();
}

module.exports = { listenTwitch };