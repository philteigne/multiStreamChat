import logo from './logo.svg';
import {React, useState} from 'react';

import ChatCredentialsForm from './components/ChatCredentialsForm';
import ChatDisplay from './components/ChatDisplay';

import { listenLive } from './helpers/compilers';

import './App.css';

function App() {

  const [youtubeChannelID, setYoutubeChannelID] = useState("");
  const [googleAPIKey, setGoogleAPIKey] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [pullFrequency, setPullFrequency] = useState(5);
  const [messages, setMessages] = useState([])

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
        }}>
        Start Polling
      </button>
      <ChatDisplay
        messages={messages}
      />
      <ChatCredentialsForm
        setYoutubeChannelID={setYoutubeChannelID}
        setGoogleAPIKey={setGoogleAPIKey}
        setMessageCount={setMessageCount}
        setPullFrequency={setPullFrequency}
      />
    </div>
  );
}

export default App;
