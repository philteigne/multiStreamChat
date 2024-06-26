/* eslint-disable func-style */
const fetch = require('node-fetch');

// TWITCH
// const { buildClient } = require('./twitchChat/twitchCredentials.js');
// const { sayMessage } = require('./twitchChat/twitchHelperFunctions.js');

// YOUTUBE
const { fetchLiveChatURL } = require('../youtubeChat/youtubeCredentials.js');
const { listenYoutube } = require('../youtubeChat/youtubeHelperFunctions.js');
const { listenTwitch } = require('../twitchChat/twitchHelperFunctions.js');

const listenLive = (youtubeChannelID, googleAPIKey, totalComments, interval, callback) => {

  // Listen to Twitch
  const twitchClient = listenTwitch('ledfalcon', callback);

  // Listen to Youtube
  return fetchLiveChatURL(youtubeChannelID, googleAPIKey)
    .then(liveChatID => {
      const stopYoutubeListening = listenYoutube(liveChatID, totalComments, googleAPIKey, interval, callback);
      const stopTwitchListening = () => twitchClient.disconnect()

      return {
        stopYoutubeListening,
        stopTwitchListening,
      };
    });
};

module.exports = { listenLive };