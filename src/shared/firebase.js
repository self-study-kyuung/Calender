import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
require('dotenv').config();

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firestore };
