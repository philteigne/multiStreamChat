
const fetch = require("node-fetch");

const findLiveEvents = (youtubeChannelID, googleAPIKey) => {
  const googleApiLiveEvents = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeChannelID}&order=date&type=video&key=${googleAPIKey}`;
  return googleApiLiveEvents;
}

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
const fetchLiveChatID = (data, googleAPIKey) => {
  console.log("data", data)
  const liveVideoID = parseLiveVideoID(data.items);

  const googleApiLiveDetails = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${liveVideoID}&key=${googleAPIKey}`;

  return fetch(googleApiLiveDetails);
};

//  retrieves activeLiveChatId from multiple google api requests
const fetchLiveChatURL = (youtubeChannelID, googleAPIKey) => {
  const googleApiLiveEvents = findLiveEvents(youtubeChannelID, googleAPIKey)
  return fetch(googleApiLiveEvents)
    .then(response => response.json())
    .then(data => fetchLiveChatID(data, googleAPIKey))
    .then(response => response.json())
    .then(data => parseLiveChatID(data))
};

module.exports = { fetchLiveChatURL };