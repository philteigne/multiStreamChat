// Loop needs to wait for previous setTimeout to end before starting the next one
const sayMessage = (target, arrayOfMessages, webSocket) => {
  if (arrayOfMessages.length > 0) {

    let i = 0;

    let slowMessages = setInterval(() => {

      webSocket.say(target, `${arrayOfMessages[i].username}: ${arrayOfMessages[i].message}`);
      i++;

      // Break setInterval when all messages have been sent
      if (i >= arrayOfMessages.length) {
        clearInterval(slowMessages);
      }

    }, 1501); // Found minimum 1025
  }
};

module.exports = { sayMessage };