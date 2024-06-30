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
          hour: "2-digit",
          minute: "2-digit",
        })
        
        return(
            <div key={index} className="message-item">
              <span className="message timestamp">{date}</span>
              {message.platform === "Youtube" && <YoutubeLogo />}
              {message.platform === "Twitch" && <TwitchLogo />}
              <span className="message sender">{message.sender.name}:</span>
              <span className="message content">{message.message}</span>    
            </div>
        )
      })}
    </div>
  );
}

export default ChatDisplay;