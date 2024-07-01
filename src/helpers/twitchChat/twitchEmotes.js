const parseTwitchEmotes = (messageObj) => {
  const emotesRaw = messageObj.userStatus['emotes-raw'];

  const emotesParsed = {}

  if (emotesRaw) {
    const emotePatterns = emotesRaw.split('/');
    emotePatterns.forEach(emotePattern => {
        const [emoteID, positions] = emotePattern.split(':');
        const posArray = positions.split(',');
        
        posArray.forEach(position => {
            const [start, end] = position.split('-').map(Number);
            emotesParsed[start] = {end: end, emoteID: emoteID}
        });
    });
}
  return emotesParsed
}

const renderTwitchEmotes = (messageObj) => {
  const parsedObj = parseTwitchEmotes(messageObj);
  const message = messageObj.message;
  let renderStr = "";
  const renderArr = [];

  for (let i = 0; i < message.length; i++) {

    // if index is flagged as an emote
    if (parsedObj[i]) {
      renderArr.push(renderStr);
      renderStr = "";

      const emoteText = message.slice(i, parsedObj[i]['end'] + 1);
      const emoteID = parsedObj[i]['emoteID'];

      renderArr.push({
        type: 'emote',
        content: emoteText,
        emoteID: emoteID,
      });

      i = parsedObj[i]['end'];
      continue;
    }
    
    // if index is not flagged as an emote
    if (!parsedObj[i]) {
      renderStr += message[i];
      continue;
    }

  }

  // if there is leftover text, push it now
  if (renderStr) {
    renderArr.push({
      type: 'message',
      content: renderStr,
    })
    renderStr = "";
  }
  
  return renderArr;
}

module.exports = {renderTwitchEmotes}