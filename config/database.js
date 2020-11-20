const firebaseConfig = {
  apiKey: "AIzaSyBopr3G-1C1fm8s-AWURh2QnMPd0Ym3t9o",
  authDomain: "shoes-backend.firebaseapp.com",
  databaseURL: "https://shoes-backend.firebaseio.com",
  projectId: "shoes-backend",
  storageBucket: "shoes-backend.appspot.com",
  messagingSenderId: "232562485617",
  appId: "1:232562485617:web:6d208e3b36fde570bfaed0",
};

const firebase = require("firebase/app");

firebase.initializeApp(firebaseConfig);

const admin = require("firebase-admin");

module.exports = admin;
