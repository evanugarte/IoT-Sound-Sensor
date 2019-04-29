import * as firebase from "firebase";
import config from "../config/fbConfig";
import { getDay, getHour } from "../helpers/TimeConvert";

firebase.initializeApp(config);
let database = firebase.firestore();

export const getSoundData = (callback, day = getDay(), hour = getHour()) => {
  let searchResults = [];
  database.collection("sound-data").doc(day).collection(hour)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let curr = doc.data();
        searchResults.push(curr);
      });
      callback(searchResults);
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
