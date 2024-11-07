import { initializeApp } from 'firebase/app'; 

const firebaseConfig = {
    apiKey: "AIzaSyB2ygeSOqIGTrIktbdUlLLknugt7aiz6lU",
    authDomain: "rn-recipie-blog.firebaseapp.com",
    projectId: "rn-recipie-blog",
    storageBucket: "rn-recipie-blog.appspot.com",
    messagingSenderId: "1033567194023",
    appId: "1:1033567194023:web:1200753ab55ea3b073c482",
    measurementId: "G-0FPVGB1Q2D"
};

export const app = initializeApp(firebaseConfig);
