//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyBhALF5uloswKZvH0Nbi80qLiYqEKioWNg",
    authDomain: "surveyblue-27fac.firebaseapp.com",
    projectId: "surveyblue-27fac",
    storageBucket: "surveyblue-27fac.appspot.com",
    messagingSenderId: "662544807398",
    appId: "1:662544807398:web:f5eea67f0be8a45ee5d227",
    measurementId: "G-7LTH89D1R0"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };