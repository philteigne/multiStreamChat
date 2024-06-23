// given an array of messages and an id of the previous most recent message, find any new messages,
// store their details in an array of objects

const ChatMessage = require('../constructors/message')

const findNewMessages = (messageArray, lastChatID) => {

  const chatMessages = [];

  for (const message of messageArray) {
    if (message.id === lastChatID) {
      break;
    }

    const sender = message.authorDetails
    const platform = 'Youtube'
    const userStatus = {
      isVerified: message.authorDetails.isVerified,
      isChatOwner: message.authorDetails.isChatOwner,
      isChatSponsor: message.authorDetails.isChatSponsor,
      isChatModerator: message.authorDetails.isChatModerator,
    }
    const messageContent = message.snippet.displayMessage
    const messageID = message.id
    const timestamp = message.snippet.publishedAt

    chatMessages.unshift(
      new ChatMessage(
        platform,
        sender,
        userStatus,
        messageContent,
        messageID,
        timestamp,
      )
    );
  }

  return chatMessages;
};

const listenYoutube = (liveChatID, totalComments, googleAPIKey, interval, callback) => {
  let googleApiChat = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatID}&part=snippet,authorDetails&maxResults=${totalComments}&key=${googleAPIKey}`;
  let lastChatID = "";
  
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

        chatMessages.forEach(message => {
          console.log(message)
          callback(message)
        });

        lastChatID = mostRecentMessage;

        return;
      });
  }, interval * 1000);
  
};

module.exports = { listenYoutube };