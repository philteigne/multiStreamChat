import {React} from 'react';

const ChatCredentialsForm = ({setYoutubeChannelID, setGoogleAPIKey, setMessageCount, setPullFrequency}) => {

  return(
    <form>
      <label>
        Youtube Channel ID
        <input onChange={(e) => setYoutubeChannelID(e.target.value)}></input>
      </label>
      <label>
        Google API Key
        <input onChange={(e) => setGoogleAPIKey(e.target.value)} type="password"></input>
      </label>
      <label>
        Number of Messages
        <input onChange={(e) => setMessageCount(e.target.value)}></input>
      </label>
      <label>
        Pull Frequency (Seconds)
        <input onChange={(e) => setPullFrequency(e.target.value)}></input>
      </label>
    </form>
  );
}

export default ChatCredentialsForm;