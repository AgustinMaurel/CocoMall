import firebase from 'firebase/compat/app' ; 
import 'firebase/compat/auth'; 


 const firebaseConfig = firebase.initializeApp ({
    apiKey: "AIzaSyDS9xcLmErsofkTYkX-IqsBgdx_aboyU6c",
    authDomain: "coco-mall-15621.firebaseapp.com",
    projectId: "coco-mall-15621",
    storageBucket: "coco-mall-15621.appspot.com",
    messagingSenderId: "590070526868",
    appId: "1:590070526868:web:f7d729f69dbb6111f6d581",
    measurementId: "G-NZK5LL6S5E"
  }) ;
  


export const auth = firebase.auth()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()


export default firebaseConfig;
 