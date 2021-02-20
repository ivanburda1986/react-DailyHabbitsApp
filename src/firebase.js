//Firebase
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const  firebaseConfig = {
  apiKey: "AIzaSyBERXVHlBmqzrOnUEFhfjji2k1GZ7pXfYU",
  authDomain: "habits-6349a.firebaseapp.com",
  databaseURL: "https://habits-6349a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "habits-6349a",
  storageBucket: "habits-6349a.appspot.com",
  messagingSenderId: "491187493233",
  appId: "1:491187493233:web:e7d0032961a21b581b7ed0",
  measurementId: "G-7NE3EC8LYV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;