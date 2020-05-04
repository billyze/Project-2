import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC2GpsCZEzNDadhisr7VToo9wdnRSe5GwU',
  authDomain: 'project2-a30a2.firebaseapp.com',
  databaseURL: 'https://project2-a30a2.firebaseio.com',
  projectId: 'project2-a30a2',
  storageBucket: 'project2-a30a2.appspot.com',
  messagingSenderId: '442249777790',
  appId: '1:442249777790:web:1a78099c125bd0fdc97e2f',
  measurementId: 'G-VLBGQKDH1G',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const trackStock = []

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        trackStock,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};



export const updateTracking = async (user, item) => {

  const {id} = user
  let stockArr = await firestore.collection('users').doc(id)

  try {
    stockArr.update({
      trackStock: firebase.firestore.FieldValue.arrayUnion(item)
  });
  }catch (error){
    console.log('Error adding stock', error)
  }
  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
