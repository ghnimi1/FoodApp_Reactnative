import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAwK_VQmkMIC0-r1N_94Y6bff84TblBkPE",
    authDomain: "mini-netflix-56385.firebaseapp.com",
    databaseURL: "https://mini-netflix-56385.firebaseio.com",
    projectId: "mini-netflix-56385",
    storageBucket: "mini-netflix-56385.appspot.com",
    messagingSenderId: "753589373561",
    appId: "1:753589373561:web:5a280e38a1f3a86a3b22a8"
})

export const auth = app.auth()
export default app