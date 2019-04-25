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
  
  /**
   * Finally, we write to firestore. The hierarchy can be seen as follows.
   * collection sound-data
   *    doc for each day ("Monday", "Tuesday", etc.)
   *        collection for a sound reading done every minute
   *          - sound: sensor sound data
   *          - minutes: minute of the hour that the measurement was made
   */
  firestore.collection("sound-data")
    .doc(days[d.getDay()])
  	.collection(d.getHours().toString())
    .add({
    sound: soundVal,
    minutes: d.getMinutes().toString()
  });
};
