const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
  //  search IP location once IP has been found
  fetchCoordsByIP(ip, (error, location) => {
    if (error) {
      console.log("It didn't work", error);
      return;
    }
    console.log("I know where you live:", location);
    //  search flyover times once location has been found
    fetchISSFlyOverTimes(location, (error, issInfo) => {
      if (error) {
        console.log("It didn't work", error);
        return;
      }
      console.log("Look up, it might be there right now!", issInfo);
      //  declare fly over times once they have been found
      nextISSTimesForMyLocation(issInfo, (passOvers) => {
        if (error) {
          console.log("It didn't work", error);
        }
    
        passOvers.forEach(element => console.log(element));
        return;
      });
    });
  });
});