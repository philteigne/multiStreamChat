import {React, useState} from 'react';

import ChatCredentialsForm from './components/ChatCredentialsForm';
import ChatDisplay from './components/ChatDisplay';

import CloseIcon from './assets/images/CloseIcon';

import { listenLive } from './helpers/compilers';

import './styles/App.css';

function App() {

  const [appView, setAppView] = useState("Form") // Form or Chat

  const [messageData, setMessageData] = useState({})

  const [youtubeChannelID, setYoutubeChannelID] = useState("");
  const [twitchChannelName, setTwitchChannelName] = useState("")
  const [googleAPIKey, setGoogleAPIKey] = useState("");
  const [messageCount, setMessageCount] = useState(500);
  const [pullFrequency, setPullFrequency] = useState(1);
  
  const [messages, setMessages] = useState([])

  const [stopMessageFn, setStopMessageFn] = useState({ stopYoutubeListening: () => {}, stopTwitchListening: () => {}});

  const handleSubmit = () => {
    setAppView("Chat")
    listenLive(youtubeChannelID, twitchChannelName, googleAPIKey, messageCount, pullFrequency, setMessagesWithHistory, setMessageData)
      .then(({ stopYoutubeListening, stopTwitchListening }) => {
        setStopMessageFn({ stopYoutubeListening, stopTwitchListening })
      })
  }

  const setMessagesWithHistory = (newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages;
    });
  };

  return (
    <div className='app'>
      <nav>
        <div className='button-inverse'>
          <h1>MULTi</h1>
        </div>
        <button className='nav-button' onClick={() => {
          setAppView("Form")
          stopMessageFn.stopYoutubeListening();
          stopMessageFn.stopTwitchListening();
        }}>
          <CloseIcon />
        </button>
      </nav>
      {(appView === "Chat") &&
        <ChatDisplay
          messages={messages}
        />}
      {(appView === "Form") &&
        <ChatCredentialsForm
          youtubeChannelID={youtubeChannelID}
          setYoutubeChannelID={setYoutubeChannelID}
          twitchChannelName={twitchChannelName}
          setTwitchChannelName={setTwitchChannelName}
          googleAPIKey={googleAPIKey}
          setGoogleAPIKey={setGoogleAPIKey}
          handleSubmit={handleSubmit}
        />}
    </div>
  );
}

export default App;
