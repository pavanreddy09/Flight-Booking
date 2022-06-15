import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQnntcJcEGp6hPgjxW-UM6fLqdrGjMZz4",
  authDomain: "flight-booking-b53a6.firebaseapp.com",
  databaseURL: "https://flight-booking-b53a6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flight-booking-b53a6",
  storageBucket: "flight-booking-b53a6.appspot.com",
  messagingSenderId: "841267944685",
  appId: "1:841267944685:web:09fedc738779a0db8f00e4"
};

const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
export const firebaseAuth = getAuth(app);