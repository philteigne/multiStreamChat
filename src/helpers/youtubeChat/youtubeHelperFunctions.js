// given an array of messages and an id of the previous most recent message, find any new messages,
// store their details in an array of objects

const ChatMessage = require('../constructors/message')

const findNewMessages = (messageArray, lastChatID) => {

  const chatMessages = [];

  for (const message of messageArray) {
    if (message.id === lastChatID) {
      break;
    }

    const sender = {
      name: message.authorDetails.displayName,
      channel: message.authorDetails.channelUrl,
      avatar: message.authorDetails.profileImageUrl,
    }
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
  if (!liveChatID) {
    // error finding livestream'
    return () => {}
  }

  let googleApiChat = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatID}&part=snippet,authorDetails&maxResults=${totalComments}&key=${googleAPIKey}`;
  let lastChatID = "";
  
  console.log("Polling for new messages...\n");

  //  continuously fetch youtube messages and check for new ones
  const intervalID = setInterval(() => {
    fetch(googleApiChat)
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
          callback(message)
        });

        lastChatID = mostRecentMessage;
      });
  }, interval * 1000);

  // Return a function that stops the interval
  return () => clearInterval(intervalID)
};

module.exports = { listenYoutube };