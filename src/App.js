import {React, useState} from 'react';

import ChatCredentialsForm from './components/ChatCredentialsForm';
import ChatDisplay from './components/ChatDisplay';
import PullData from './components/PullData';

import { listenLive } from './helpers/compilers';

import './App.css';

function App() {

  const [messageData, setMessageData] = useState({})

  const [youtubeChannelID, setYoutubeChannelID] = useState("UCifCesg-EUkjKyQedaB3hRg");
  const [twitchChannelName, setTwitchChannelName] = useState("ledfalcon")
  const [googleAPIKey, setGoogleAPIKey] = useState("");

  const [messageCount, setMessageCount] = useState(2000);
  const [pullFrequency, setPullFrequency] = useState(2);
  const [messages, setMessages] = useState([])

  const [stopMessageFn, setStopMessageFn] = useState({ stopYoutubeListening: () => {}, stopTwitchListening: () => {}});

  // listenLive = (youtubeChannelID, googleAPIKey, totalComments, interval, messageArray)

  const setMessagesWithHistory = (newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      // console.log(updatedMessages); // This will log the updated state
      return updatedMessages;
    });
  };

  return (
    <div>
      <button onClick={() => {
          listenLive(youtubeChannelID, twitchChannelName, googleAPIKey, messageCount, pullFrequency, setMessagesWithHistory, setMessageData)
            .then(({ stopYoutubeListening, stopTwitchListening }) => {
              setStopMessageFn({ stopYoutubeListening, stopTwitchListening })
            })
        }}>
        Start Polling
      </button>
      <button onClick={() => {
        stopMessageFn.stopYoutubeListening();
        stopMessageFn.stopTwitchListening();
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
      <PullData messageData={messageData} />
    </div>
  );
}

export default App;
