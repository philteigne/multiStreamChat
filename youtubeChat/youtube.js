const fetch = require('node-fetch');
const { fetchLiveChatURL } = require('./liveStreamDetails');
const { apiKey, interval } = require('./channelCredentials');

let lastChatID = "";

const intervalMilli = interval * 1000;

const findNewMessage = (liveChatID) => {

  let googleApiChat = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatID}&part=snippet,authorDetails&maxResults=2000&key=${apiKey}`;
  
  console.log("Polling for new messages...\n");

  setInterval(() => {
    return fetch(googleApiChat)
      .then(response => response.json())
      .then((responseJSON) => {
        const messageArray = responseJSON.items.reverse();
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

        for (const message of chatMessages) {
          console.log(`${message.username}: ${message.message}`);
        }
        lastChatID = mostRecentMessage;
        // console.log(chatMessages);
        return chatMessages;
      });
  }, intervalMilli);
  

};

const pollMessages = () => {
  return fetchLiveChatURL()
    .then(findNewMessage);
};

pollMessages();