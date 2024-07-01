/* eslint-disable func-style */

// TWITCH
// const { buildClient } = require('./twitchChat/twitchCredentials.js');
// const { sayMessage } = require('./twitchChat/twitchHelperFunctions.js');

// YOUTUBE
const { fetchLiveChatURL } = require('../youtubeChat/youtubeCredentials.js');
const { listenYoutube } = require('../youtubeChat/youtubeHelperFunctions.js');
const { listenTwitch } = require('../twitchChat/twitchHelperFunctions.js');

const listenLive = (youtubeChannelID, twitchChannel, googleAPIKey, totalComments, interval, callback) => {

  // Listen to Twitch
  const twitchClient = listenTwitch(twitchChannel, callback);
  const stopTwitchListening = () => {
    twitchClient.disconnect()
  }

  // Check if twitchClient has a disconnect method
  if (typeof twitchClient.disconnect !== 'function') {
    throw new Error('Twitch client does not have a disconnect method');
  } else {
    console.log("got it")
  }

  // Listen to Youtube
  return fetchLiveChatURL(youtubeChannelID, googleAPIKey)
    .then(liveChatID => {
      const stopYoutubeListening = listenYoutube(liveChatID, totalComments, googleAPIKey, interval, callback);

      return {
        stopYoutubeListening,
        stopTwitchListening,
      };
    });
};

module.exports = { listenLive };