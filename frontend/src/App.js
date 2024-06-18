import logo from './logo.svg';
import React from 'react';

import ChatCredentialsForm from './components/ChatCredentialsForm';
import ChatDisplay from './components/ChatDisplay';

import './App.css';

function App() {

  const state = {
    channelCredentials: {
      youtubeChannelID: "UCKnodHJpZd8UbSvAufDd3_g",
      twitchChannelID: "ledfalcon",
      googleAPIKey: "placeholder" 
    }
  }
  return (
    <div>
      <ChatDisplay />
      <ChatCredentialsForm />
    </div>
  );
}

export default App;
