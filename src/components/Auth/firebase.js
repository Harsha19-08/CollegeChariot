
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
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