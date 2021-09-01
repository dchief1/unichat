import firebase from "firebase/app"
import 'firebase/auth'

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDP5bZ8yaWWIZXnahSXd8p_HurDbRzZDTw",
    authDomain: "unichat-e7873.firebaseapp.com",
    projectId: "unichat-e7873",
    storageBucket: "unichat-e7873.appspot.com",
    messagingSenderId: "1023045787760",
    appId: "1:1023045787760:web:00531dc4ce178d1de114b5"
  }).auth();