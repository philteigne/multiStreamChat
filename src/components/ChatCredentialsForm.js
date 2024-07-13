import {React} from 'react';

const ChatCredentialsForm = ({setYoutubeChannelID, setTwitchChannelName, setGoogleAPIKey, handleSubmit}) => {

  return(
    <form>
      <span className='form-input'>
        <label>
          YOUTUBE CHANNEL ID
        </label>
        <input onChange={(e) => setYoutubeChannelID(e.target.value)}></input>
      </span>
      <span className='form-input'>
        <label>
          TWITCH CHANNEL ID
        </label>
        <input onChange={(e) => setTwitchChannelName(e.target.value)}></input>
      </span>
      <span className='form-input'>
        <label>
          GOOGLE API KEY
        </label>
        <input onChange={(e) => setGoogleAPIKey(e.target.value)} type="password"></input>
      </span>
      <button className='form-button' onClick={() => {
          handleSubmit()
        }}>
        COMBINE
      </button>
    </form>
  );
}

export default ChatCredentialsForm;