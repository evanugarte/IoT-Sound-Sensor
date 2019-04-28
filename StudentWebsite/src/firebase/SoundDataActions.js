import * as firebase from "firebase";
import config from "../config/fbConfig";
import { getDay, getHour } from "../helpers/TimeConvert";

firebase.initializeApp(config);
let database = firebase.firestore();

export const getSoundData = () => {
  console.log("getting sound from ", getDay(), getHour());
  let searchResults = [];
  database.collection("sound-data").doc(getDay()).collection(getHour())
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let curr = doc.data();
        console.log(curr);
        searchResults.push(curr);
      });
    });
  return searchResults;
};

export const listenForData = (callback) => {
  
  database.collection("sound-data").doc(getDay()).collection(getHour())
    .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if(change.type === "added")
        {
          console.log("sum happened mane");
          callback();
        }
      });
    });
};

