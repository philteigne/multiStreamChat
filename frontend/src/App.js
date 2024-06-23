import logo from './logo.svg';
import {React, useState} from 'react';

import ChatCredentialsForm from './components/ChatCredentialsForm';
import ChatDisplay from './components/ChatDisplay';

import { pollMessages } from './helpers/compilers';
import { buildClient } from './helpers/twitchChat/twitchCredentials';

import './App.css';

function App() {

  const [youtubeChannelID, setYoutubeChannelID] = useState("");
  const [googleAPIKey, setGoogleAPIKey] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [pullFrequency, setPullFrequency] = useState(5);

  return (
    <div>
      <button onClick={() => {
          console.log(youtubeChannelID)
          console.log(googleAPIKey)
          console.log(messageCount)
          console.log(pullFrequency)
          // pollMessages("UCrPseYLGpNygVi34QpGNqpA", googleAPIKey, 5, 5)
        }}>
        Start Polling
      </button>
      <ChatDisplay />
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
