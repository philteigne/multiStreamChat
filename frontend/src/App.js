import logo from './logo.svg';
import {React, useState} from 'react';

import ChatCredentialsForm from './components/ChatCredentialsForm';
import ChatDisplay from './components/ChatDisplay';

import { pollMessages } from './helpers/compilers';
import { buildClient } from './helpers/twitchChat/twitchCredentials';

import './App.css';

function App() {

  const [googleAPIKey, setGoogleAPIKey] = useState("");

  const state = {
    channelCredentials: {
      youtubeChannelID: "UCrPseYLGpNygVi34QpGNqpA",
      twitchChannelID: "ledfalcon",
      googleAPIKey: "placeholder" 
    }
  }

  return (
    <div>
      <form>
        <input onChange={(e) => {
          setGoogleAPIKey(e.target.value)
          console.log(googleAPIKey)
          }}></input>
      </form>
      <button onClick={() => {
          console.log(googleAPIKey)
          pollMessages("UCrPseYLGpNygVi34QpGNqpA", googleAPIKey, 5, 5)
        }}>
        Start Polling
      </button>
      <ChatDisplay />
      <ChatCredentialsForm />
    </div>
  );
}

export default App;
