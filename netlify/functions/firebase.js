const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyAFCiXyrXlfEXdE5iyvX-EnTfhh17luzZs",
  authDomain: "kiei-final-proj.firebaseapp.com",
  projectId: "kiei-final-proj",
  storageBucket: "kiei-final-proj.appspot.com",
  messagingSenderId: "675527405123",
  appId: "1:675527405123:web:1257908b74715937cfeef6"
} 

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase