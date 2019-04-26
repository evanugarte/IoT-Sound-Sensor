/**
 * This function takes a string and returns a formatted object
 * that extracts the corner of the room the sensor is in as well
 * as the sensor's value.
 * @param str the string to be formatted
 * @returns result, the object containing location and sound value
 */
function getSoundObj(str) {
  let result = {};
  if(str.length < 3) return result;
  let loc = str.substring(0,2);

  switch(loc){
    case "NE":
      result.location = loc;
    break;
    case "NW":
      result.location = loc;
    break;
    case "SE":
      result.location = loc;
    break;
    case "SW":
      result.location = loc;
    break;
    default:
      result.location = "nothing";
  }

  result.value = str.substring(3,str.length);
  return result;
}

/**
 * Triggered from a message on the Cloud Pub/Sub topic "sound-data"
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.helloPubSub = (data, context) => {
  /**
   * The function will be writing to a firestore database, so here we require
   * firebase from our package.json
   */
  const Firestore = require("@google-cloud/firestore");
  const firestore = new Firestore();
  
  /**
   * Our data is stored by day and then by hour and minute. To properly
   * convert Date().getDay() to a string, this array comes in handy.
   */
  const days = ["Sunday","Monday","Tuesday",
                "Wednesday","Thursday","Friday",
                "Saturday"];
 
  /**
   * Here, we initialize a date object to the timezone that we are in.
   */
  let d = new Date()
  	.toLocaleString("en-US", 
     	{timeZone: "America/Los_Angeles"});
  
  d = new Date(d);
  
  
  /**
   * Using the parameter data, we extract the messages contents and
   * store the result to a string called soundVal. soundVal will be 
   * placed in our firestore collections for keeping track of time.
   */
  const pubSubMessage = data;
  const soundVal = pubSubMessage.data
    ? Buffer.from(pubSubMessage.data, 'base64').toString()
    : 'No value.';
  

  let resultObj = getSoundObj(soundVal);

  /**
   * Finally, we write to firestore. The hierarchy can be seen as follows.
   * collection sound-data
   *    doc for each day ("Monday", "Tuesday", etc.)
   *        collection for a sound reading done every minute
   *          - location: the corner of the room where the ESP is
   *          - sound: sensor sound data
   *          - minutes: minute of the hour that the measurement was made
   */
  firestore.collection("sound-data")
    .doc(days[d.getDay()])
  	.collection(d.getHours().toString())
    .add({
      location: resultObj.location,
      sound: resultObj.value,
      minutes: d.getMinutes().toString()
  });
};
