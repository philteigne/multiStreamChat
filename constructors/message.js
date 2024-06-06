class ChatMessage {
  constructor(
    platform,
    sender,
    userStatus,
    message,
    messageID,
    timestamp
  ) {
    this.platform = platform;
    this.sender = sender;
    this.userStatus = userStatus;
    this.message = message;
    this.messageID = messageID;
    this.timestamp = timestamp;
  }
}

module.exports = ChatMessage;