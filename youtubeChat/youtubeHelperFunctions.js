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


module.exports = { findNewMessages };