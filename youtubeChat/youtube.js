const fetch = require('node-fetch');
const { fetchLiveChatURL } = require('./liveStreamDetails');
const { apiKey, interval, totalComments } = require('./channelCredentials');

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
        console.log("chatMessages");
        // callback(chatMessages);
        //  display new messages in console
        // for (const message of chatMessages) {
          // console.log(`${message.username}: ${message.message}`);
        // }

        lastChatID = mostRecentMessage;

        return chatMessages;
      });
  }, intervalMilli);
  

};

// const pollMessages = () => {
//   return fetchLiveChatURL()
//     .then(findNewMessage);
// };

module.exports = { findNewMessage };