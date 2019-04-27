import * as firebase from "firebase";
import config from "../config/fbConfig";

firebase.initializeApp(config);
let database = firebase.firestore();


export const getSoundData = (day, hour) => {
  let searchResults = [];
  console.log("walking in ny");
  database.collection("sound-data").doc(day).collection(hour)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let curr = doc.data();
        console.log(curr);
        searchResults.push(curr);
      });
    });
};


