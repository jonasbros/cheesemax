import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// import { getAnalytics } from "firebase/analytic"

const firebaseConfig = {
    apiKey: "AIzaSyD_FOpZC2gs3zmc0VTNMYeI01m16CWTRs4",
    authDomain: "react-chat-f3838.firebaseapp.com",
    projectId: "react-chat-f3838",
    storageBucket: "react-chat-f3838.appspot.com",
    messagingSenderId: "151810268195",
    appId: "1:151810268195:web:297a5964e13902d8716596",
    measurementId: "G-W6RKDR17B6"
}

export {firebase}
export const app = firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()
export const auth = firebase.auth()

const defaultObj = { app, firestore, auth, firebase }
export default defaultObj

 