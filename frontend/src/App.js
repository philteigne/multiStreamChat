import logo from './logo.svg';
import {React, useState} from 'react';

import ChatCredentialsForm from './components/ChatCredentialsForm';
import ChatDisplay from './components/ChatDisplay';

import { listenLive } from './helpers/compilers';

import './App.css';

function App() {

  const [youtubeChannelID, setYoutubeChannelID] = useState("");
  const [twitchChannelName, setTwitchChannelName] = useState("")
  const [googleAPIKey, setGoogleAPIKey] = useState("");
  const [messageCount, setMessageCount] = useState(5);
  const [pullFrequency, setPullFrequency] = useState(1);
  const [messages, setMessages] = useState([])

  const [stopMessageFn, setStopMessageFn] = useState({ stopYoutubeListening: () => {}, stopTwitchListening: () => {}});

  // listenLive = (youtubeChannelID, googleAPIKey, totalComments, interval, messageArray)

  const setMessagesWithHistory = (newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      console.log(updatedMessages); // This will log the updated state
      return updatedMessages;
    });
  };

  return (
    <div>
      <button onClick={() => {
          console.log(youtubeChannelID)
          console.log(googleAPIKey)
          console.log(messageCount)
          console.log(pullFrequency)
          listenLive(youtubeChannelID, googleAPIKey, messageCount, pullFrequency, setMessagesWithHistory)
            .then(({ stopYoutubeListening }) => {
              setStopMessageFn({ stopYoutubeListening })
            })
        }}>
        Start Polling
      </button>
      <button onClick={() => {
        stopMessageFn.stopYoutubeListening();
      }}>
        Stop Polling
      </button>
      <ChatDisplay
        messages={messages}
      />
      <ChatCredentialsForm
        setYoutubeChannelID={setYoutubeChannelID}
        setTwitchChannelName={setTwitchChannelName}
        setGoogleAPIKey={setGoogleAPIKey}
        setMessageCount={setMessageCount}
        setPullFrequency={setPullFrequency}
      />
    </div>
  );
}

export default App;
