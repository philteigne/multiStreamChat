const fetch = require("node-fetch");
const { apiKey, channelID } = require('./channelCredentials');

const googleApiLiveEvents = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&order=date&type=video&key=${apiKey}`;

//  find and return the activeLiveChatId from current live stream
const parseLiveChatID = (data) => {
  const liveChatID = data.items[0].liveStreamingDetails.activeLiveChatId;
  return liveChatID;
};

//  find and return the videoId of the current 'live' instance
const parseLiveVideoID = (arrOfVideos) => {
  for (let instance of arrOfVideos) {
    if (instance.snippet.liveBroadcastContent === 'live') {
      return instance.id.videoId;
    }
  }
};

//  fetch data from details of active livestream
const fetchLiveChatID = (data) => {

  const liveVideoID = parseLiveVideoID(data.items);

  const googleApiLiveDetails = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${liveVideoID}&key=${apiKey}`;

  return fetch(googleApiLiveDetails);
};


//  retrieves activeLiveChatId from multiple google api requests
const fetchLiveChatURL = () => {
  return fetch(googleApiLiveEvents)
    .then(response => response.json())
    .then(fetchLiveChatID)
    .then(response => response.json())
    .then(parseLiveChatID);
};

module.exports = { fetchLiveChatURL };