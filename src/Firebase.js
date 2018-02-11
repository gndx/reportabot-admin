import firebase from 'firebase';

const config = {
    apiKey: "",
    authDomain: "<YOUR_APP>.firebaseapp.com",
    databaseURL: "https://<YOUR_APP>.firebaseio.com",
    projectId: "<YOUR_APP>",
    storageBucket: "<YOUR_APP>.appspot.com",
    messagingSenderId: ""
};

const firebaseConf = firebase.initializeApp(config);
export default firebaseConf;