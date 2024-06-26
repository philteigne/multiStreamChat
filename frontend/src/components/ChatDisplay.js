import React from 'react';

const ChatDisplay = ({messages}) => {
  return(
    <React.Fragment>
      {messages.map((message) => {
        return(
          <li>
            {`${message.timestamp} - ${message.platform} - ${message.sender.name}: ${message.message}`}
          </li>
        )
      })}
    </React.Fragment>
  );
}

export default ChatDisplay;