const admin = require('firebase-admin');


const app = express();

const credentials= require('./firebaseConfig.json');   

  admin.initializeApp({
    credential:admin.credential.cert(credentials)
  });
  const db = admin.firestore();
  const Flights = db.collection("Flights");
  const Cities=db.collection("Cities");

  module.exports={
    Flights:Flights,
    Cities:Cities
  }
 

  // const firebaseConfig = {
//     apiKey: "AIzaSyDBLDyTqe31wWDtzm-49CYGghzxbMvzA7g",
//     authDomain: "makemytripclone-1e4d6.firebaseapp.com",
//     projectId: "makemytripclone-1e4d6",
//     storageBucket: "makemytripclone-1e4d6.appspot.com",
//     messagingSenderId: "534778899723",
//     appId: "1:534778899723:web:d83664e9c392a1d7ff060e",
//     measurementId: "G-2XDXD1HTB9"
//   };