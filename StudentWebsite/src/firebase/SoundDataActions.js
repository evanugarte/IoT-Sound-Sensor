import * as firebase from "firebase";
import config from "../config/fbConfig";
import { getDay, getHour, soundAvg } from "../helpers/helpers";
firebase.initializeApp(config);
let database = firebase.firestore();

export const getSoundData = (callback, day = getDay(), hour = getHour()) => {
  let searchObj = { };
  let NESound = [];
  let NWSound = [];
  let SESound = [];
  let SWSound = [];
  database.collection("sound-data").doc(day).collection(hour)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

        let currObj = doc.data();
        
        switch(currObj.location) {
        case "NE":
          NESound.push(currObj);
          break;
        case "NW":
          NWSound.push(currObj);
          break;
        case "SE":
          SESound.push(currObj);
          break;
        case "SW":
          SWSound.push(currObj);
          break;
        default:
          /* shouldn't happen */
        }
      });
      /* If i feel like getting the sound at each minute */
      // NESound = soundSorter(NESound);
      // NWSound = soundSorter(NWSound);
      // SESound = soundSorter(SESound);
      // SWSound = soundSorter(SWSound);

      searchObj.NWAvg = soundAvg(NWSound);
      searchObj.NEAvg = soundAvg(NESound);
      searchObj.SWAvg = soundAvg(SWSound);
      searchObj.SEAvg = soundAvg(SESound);

      searchObj.totalAvg = soundAvg(NESound.concat(NWSound)
        .concat(SESound).concat(SWSound));

      callback(searchObj, hour);
    });
};

export const listenForData = (callback) => {
  database.collection("sound-data")
    .doc(getDay()).collection(getHour())
    .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if(change.type === "added")
        {
          callback(change.doc.data());
        }
      });
    });
};
