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

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
// client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// When sent an array of youtube messages, format the messages as 'username: message', write the messages to twitch
const forwardYTMessages = (target) => {
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

  testMessages.forEach(message => {
    client.say(target, `${message.username}: ${message.message}`);
  });
};

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  // setTimeout((target) => {
  //   const testMessages = [
  //     {
  //       username: 'test01',
  //       timestamp: 'Dec-01',
  //       message: 'This is just a test',
  //       messageID: '123456'
  //     },
  //     {
  //       username: 'test02',
  //       timestamp: 'Dec-01',
  //       message: 'This is just a test',
  //       messageID: '123456'
  //     },
  //     {
  //       username: 'test03',
  //       timestamp: 'Dec-01',
  //       message: 'This is just a test',
  //       messageID: '123456'
  //     }
  //   ];
  
  //   testMessages.forEach(message => {
  //     console.log('attempting to speak');
  //     client.say(target, `${message.username}: ${message.message}`);
  //   });
  // }, 4000);

}


client.on('message', onMessageHandler);


// Loop needs to wait for previous setTimeout to end before starting the next one
const sayMessage = (target, arrayOfMessages) => {
  if (arrayOfMessages.length > 1) {

    let i = 0;

    let slowMessages = setInterval(() => {

      client.say(target, `${arrayOfMessages[i].username}: ${arrayOfMessages[i].message}`);
      i++;

      // Break setInterval when all messages have been sent
      if (i >= arrayOfMessages.length) {
        clearInterval(slowMessages);
      }

    }, 2000);
  }
};


function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

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

  sayMessage(target, testMessages);
}


// Connect to Twitch:
client.connect().catch(console.error);
