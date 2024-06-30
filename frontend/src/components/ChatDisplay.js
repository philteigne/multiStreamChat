import React from 'react';
import '../styles/Reset.css';
import '../styles/Messages.css'

import TwitchLogo from '../assets/images/platform-logos/TwitchLogo';
import YoutubeLogo from '../assets/images/platform-logos/YoutubeLogo';

const ChatDisplay = ({messages}) => {
  return(
    <div className="message-display">
      {messages.map((message, index) => {
        let date = message.timestamp
        if (message.platform === 'Youtube') {
          date = Date.parse(date)
        };
        // TODO: Grab user timezone from browser?
        date = new Date(date);
        // en-GB for 24hour clock, en-US for AM/PM
        date = date.toLocaleTimeString("en-GB", {
          timezone: "UTC",
        })
        
        return(            
            <div key={index} className="message-item">
              <p className="message timestamp">{date}</p>
              {message.platform === "Youtube" && <YoutubeLogo />}
              {message.platform === "Twitch" && <TwitchLogo />}
              <p className="message sender">{message.sender.name}</p>
              <p className="message content">: {message.message}</p>
            </div>
        )
      })}
    </div>
  );
}

export default ChatDisplay;