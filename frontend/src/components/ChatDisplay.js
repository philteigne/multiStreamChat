import React from 'react';

const ChatDisplay = ({messages}) => {
  return(
    <React.Fragment>
      {messages.map((message) => {
        return(
          <li>
            {message.message}
          </li>
        )
      })}
    </React.Fragment>
  );
}

export default ChatDisplay;