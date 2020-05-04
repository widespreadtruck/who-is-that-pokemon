import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: 'AIzaSyAqIuBiwmY9Tt0O3t5-c6XndnsjRAY-1TQ',
    authDomain: 'voting-app-db521.firebaseapp.com',
    databaseURL: 'https://voting-app-db521.firebaseio.com',
    projectId: 'voting-app-db521',
    storageBucket: 'voting-app-db521.appspot.com',
    messagingSenderId: '77291269849',
    appId: '1:77291269849:web:7fac503e2d79a0f27cd8c8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;