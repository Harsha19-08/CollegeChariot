
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGr6S07W9C5AUZlO-_y6tgDk3iKdeKZls",
  authDomain: "collegechariot.firebaseapp.com",
  projectId: "collegechariot",
  storageBucket: "collegechariot.appspot.com",
  messagingSenderId: "72793152665",
  appId: "1:72793152665:web:b1c4eb52855494c265ec08"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth,app ,googleProvider};