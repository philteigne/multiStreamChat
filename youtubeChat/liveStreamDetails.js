const fetch = require("node-fetch");
const { apiKey, channelID } = require('./channelCredentials');

const googleApiLiveEvents = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&order=date&type=video&key=${apiKey}`;
// const googleApiLiveDetails = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${liveVideoID}&key=${apiKey}`;
// let googleApiChat = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatID}&part=snippet,authorDetails&maxResults=2000&key=${apiKey}`;

const parseLiveChatID = (data) => {
  const liveChatID = data.items[0].liveStreamingDetails.activeLiveChatId;
  return liveChatID;
};

const parseLiveVideoID = (arrOfVideos) => {
  for (let instance of arrOfVideos) {
    if (instance.snippet.liveBroadcastContent === 'live') {
      return instance.id.videoId;
    }
  }
};

const fetchLiveChatID = (data) => {

  const liveVideoID = parseLiveVideoID(data.items);

  const googleApiLiveDetails = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${liveVideoID}&key=${apiKey}`;

  return fetch(googleApiLiveDetails);
};

//  retrieve users IP through API request
const fetchLiveChatURL = () => {
  return fetch(googleApiLiveEvents)
    .then(response => response.json())
    .then(fetchLiveChatID)
    .then(response => response.json())
    .then(parseLiveChatID);
};

module.exports = { fetchLiveChatURL };