  import * as firebase from "firebase";
  import 'firebase/firestore'
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgB21MEmTRmKyBji1fCc0ETobnxvd_OoQ",
    authDomain: "apollo-a9c9c.firebaseapp.com",
    databaseURL: "https://apollo-a9c9c.firebaseio.com",
    projectId: "apollo-a9c9c",
    storageBucket: "apollo-a9c9c.appspot.com",
    messagingSenderId: "226903852268"
  };
  var firebaseApp = firebase.initializeApp(config);
  var firebaseAuth = firebaseApp.auth();
  var firebaseStorage = firebase.storage();
  var usersCollection = firebase.firestore().collection('users');
  var chatsCollection = firebase.firestore().collection('chats');
  var messagesCollection = firebase.firestore().collection('messages')

  export {firebaseApp, firebaseAuth, usersCollection, chatsCollection, messagesCollection};
