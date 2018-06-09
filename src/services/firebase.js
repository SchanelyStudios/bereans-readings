import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_GFB_API_KEY,
  authDomain: process.env.REACT_APP_GFB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_GFB_DB_URL,
  projectId: process.env.REACT_APP_GFB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_GFB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_GFB_MSG_SENDER_ID
};

firebase.initializeApp(config);

export default firebase;
