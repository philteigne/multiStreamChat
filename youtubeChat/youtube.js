const fetch = require('node-fetch');
const { fetchLiveChatURL } = require('./liveStreamDetails');
const { apiKey } = require('./channelCredentials');

let lastChatID = "";

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
  }, 4000);
  

};

const pollMessages = () => {
  return fetchLiveChatURL()
    .then(findNewMessage);
};

pollMessages();

//  retrieve users IP through API request
// const fetchYoutubeChat = function(callback) {

//   fetch(googleApiChat)
//   request(googleApiChat, (error, response, body) => {
//     //  error can be set if invalid domain, user is offline, etc.
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     const chatObject = JSON.parse(body).items;
//     callback(error, chatObject);
//     return;
    
//   });
// };

// const pollMessages = (interval) => {
//   setInterval(() => {

//     fetchYoutubeChat((error, response) => {
//       if (error) {
//         console.log("It didn't work", error);
//         return;
//       }

//       const mostRecentMessage = response[response.length - 1].id;
  
//       const chatMessages = [];
  
//       for (let i = response.length - 1; i >= 0; i--) {
//         if (response[i].id === lastChatID) {
//           break;
//         }
        

//         chatMessages.unshift(
//           {
//             username: response[i].authorDetails.displayName,
//             timestamp: response[i].snippet.publishedAt,
//             message: response[i].snippet.displayMessage,
//             messageID: response[i].id
//           }
//         );
//       }

//       for (const message of chatMessages) {
//         console.log(`${message.username}: ${message.message}`);
//       }
//       lastChatID = mostRecentMessage;
//       return chatMessages;

//     });
//   }, interval);
// };

// fetchLiveChatURL();

// pollMessages(4000);