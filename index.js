/* eslint-disable func-style */
const fetch = require('node-fetch');

// TWITCH
const { client, opts } = require('./twitchChat/twitchCredentials.js');
const { sayMessage } = require('./twitchChat/twitchHelperFunctions.js');

// YOUTUBE
const { fetchLiveChatURL } = require('./youtubeChat/youtubeCredentials.js');
const { findNewMessages } = require('./youtubeChat/youtubeHelperFunctions.js');

// USER CUSTOMIZATION
const { googleAPIKey, interval, totalComments } = require('./userOptions.js');


const intervalInMilliseconds = interval * 1000;

let lastChatID = "";

const forwardYTChat = (liveChatID) => {
  let googleApiChat = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatID}&part=snippet,authorDetails&maxResults=${totalComments}&key=${googleAPIKey}`;
  
  console.log("Polling for new messages...\n");

  //  continuously fetch youtube messages and check for new ones
  setInterval(() => {
    return fetch(googleApiChat)
      .then(response => response.json())
      .then((responseJSON) => {

        // reverse message list order so the newest message is the first element
        const messageArray = responseJSON.items.reverse();
        const mostRecentMessage = messageArray[0].id;
        
        //  return to prevent forwarding all historical messages
        if (lastChatID === '') {
          lastChatID = mostRecentMessage;
          return;
        }
        
        const chatMessages = findNewMessages(messageArray, lastChatID);

        sayMessage(opts.channels[0], chatMessages, client);

        lastChatID = mostRecentMessage;

        return;
      });
  }, intervalInMilliseconds);
  

};

// Called every time the bot connects to Twitch chat
const onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
};

client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect().catch(console.error);


const pollMessages = () => {
  return fetchLiveChatURL()
    .then(forwardYTChat);
};

pollMessages();
