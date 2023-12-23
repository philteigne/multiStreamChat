/* eslint-disable func-style */
const tmi = require('tmi.js');
const { oauthToken } = require('../twitchAPICredentials');

const opts = {
  identity: {
    username: 'yttbot',
    password: oauthToken
  },
  channels: [
    'ledfalcon'
  ]
};

const testMessages = [
  {
    username: 'test01',
    timestamp: 'Dec-01',
    message: 'This is just a test',
    messageID: '123456'
  },
  {
    username: 'test02',
    timestamp: 'Dec-01',
    message: 'This is just a test',
    messageID: '123456'
  },
  {
    username: 'test03',
    timestamp: 'Dec-01',
    message: 'This is just a test',
    messageID: '123456'
  }
];

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
// client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// When sent an array of youtube messages, format the messages as 'username: message', write the messages to twitch
const forwardYTMessages = (target, messagesArray) => {
  messagesArray.forEach(message => {
    client.say(target, `${message.username}: ${message.message}`);
  });
};

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Connect to Twitch:
client.connect().catch(console.error)
  .then(() => {
    setTimeout(() => {
      
    }, 4000);
  });