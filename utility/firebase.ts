import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD-Myp8Y9qG8s5qW6O3WG0ZSU1Y6ZbsWUE',
  authDomain: 'sd1-trip-planner.firebaseapp.com',
  databaseURL: 'https://sd1-trip-planner-default-rtdb.firebaseio.com',
  projectId: 'sd1-trip-planner',
  storageBucket: 'sd1-trip-planner.appspot.com',
  messagingSenderId: '502567856570',
  appId: '1:502567856570:web:7bd70beae39bed2a2c5583',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'tripPlanner');
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);
