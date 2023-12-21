const { apiKey, channelID } = require('../youtubeAPICredentials');
// Your Google API key
// const apiKey;

// Your youtube channel ID
// const channelID

// The interval in seconds that the script should check chat
const interval = 4;

// The total number of comments to pull every time the interval passes
const totalComments = 50;

module.exports = { apiKey, channelID, interval, totalComments };