/* eslint-disable func-style */
const tmi = require('tmi.js');

const fetch = require('node-fetch');

const { oauthToken } = require('./twitchAPICredentials');
const { sayMessage } = require('./twitchChat/twitch.js');

const { fetchLiveChatURL } = require('./youtubeChat/liveStreamDetails');
const { apiKey, interval, totalComments } = require('./youtubeChat/channelCredentials');

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

const intervalMilli = interval * 1000;

let lastChatID = "";

const findNewMessage = (liveChatID) => {
  let googleApiChat = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatID}&part=snippet,authorDetails&maxResults=${totalComments}&key=${apiKey}`;
  
  console.log("Polling for new messages...\n");

  //  continuously fetch youtube messages and check for new ones
  setInterval(() => {
    return fetch(googleApiChat)
      .then(response => response.json())
      .then((responseJSON) => {

        // reverse message list order so the newest message is the first element
        // TODO do not pull messages from prior to the app running
        const messageArray = responseJSON.items.reverse();
        if (!messageArray) {
          return;
        }
        const mostRecentMessage = messageArray[0].id;
        const chatMessages = [];
        
        for (const message of messageArray) {
          if (message.id === lastChatID) {
            break;
          }
          
          chatMessages.unshift(
            {
              username: message.authorDetails.displayName,
              timestamp: message.snippet.publishedAt,
              message: message.snippet.displayMessage,
              messageID: message.id
            }
          );
        }

        sayMessage(opts.channels[0], chatMessages, client);

        lastChatID = mostRecentMessage;

        return chatMessages;
      });
  }, intervalMilli);
  

};

// Register our event handlers (defined below)
// client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Connect to Twitch:
client.connect().catch(console.error);


const pollMessages = () => {
  return fetchLiveChatURL()
    .then(findNewMessage);
};

pollMessages();
