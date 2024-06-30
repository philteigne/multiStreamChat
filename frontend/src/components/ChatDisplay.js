import React from 'react';
import '../styles/Reset.css';
import '../styles/Messages.css'

import TwitchLogo from '../assets/images/platform-logos/TwitchLogo';
import YoutubeLogo from '../assets/images/platform-logos/YoutubeLogo';

import { renderTwitchEmotes } from '../helpers/twitchChat/twitchEmotes';

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

        let renderArr = [];
        if (message.platform === 'Twitch') {
          renderArr = renderTwitchEmotes(message)
        }

        const chatColor = message.userStatus.color ? message.userStatus.color : '#EFEFF1';
        
        return(
            <div key={index} className="message-item">
              <span className="message timestamp">{date}</span>
              {message.platform === "Youtube" && <YoutubeLogo />}
              {message.platform === "Twitch" && <TwitchLogo />}
              <span className="message sender" style={{color: chatColor}}>{message.sender.name}:</span>
              <span className="message content">
                {message.platform === 'Twitch' && renderArr.map((item) => {
                if (item.type === "emote") {
                  return (
                    <img className="emote-twitch" src={`https://static-cdn.jtvnw.net/emoticons/v2/${item.emoteID}/default/dark/1.0`} alt={item.content} />
                  )
                }
                return (
                  <span>{item.content}</span>
                )
                })}
              </span>    
            </div>
        )
      })}
    </div>
  );
}

export default ChatDisplay;