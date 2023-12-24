// given an array of messages and an id of the previous most recent message, find any new messages,
// store their details in an array of objects
const findNewMessages = (messageArray, lastChatID) => {

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

  return chatMessages;
};


module.exports = { findNewMessages };