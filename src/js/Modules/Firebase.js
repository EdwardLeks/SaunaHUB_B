import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import UI from './UI';

const creds = {
  apiKey: 'AIzaSyC6v5asjD5KqcDUW_udaCJz9z92Y7NIoys',
  authDomain: 'saunahub-76edf.firebaseapp.com',
  projectId: 'saunahub-76edf',
  storageBucket: 'saunahub-76edf.appspot.com',
  messagingSenderId: '712781944955',
  appId: '1:712781944955:web:38c9c10bf25874b1a7eade',
};

let ui = new UI();

class Firebase {
  constructor() {
    this._Init();
    this.accountStatus = 'loggedOut';
  }

  _Init() {
    const app = initializeApp(creds);
    const db = getFirestore(app);

    this._auth = getAuth();
    onAuthStateChanged(this._auth, (user) => {
      if (user) {
        ui.AccounLoggedIn(user);
        this.accountStatus = 'loggedIn';
      } else {
        ui.AccounLoggedOut(user);
        this.accountStatus = 'loggedOut';
      }
    });
  }

  SignUp() {
    let signup = {
      name: document.getElementById('signup-name-input').value,
      email: document.getElementById('signup-email-input').value,
      password: document.getElementById('signup-password-input').value,
    };

    createUserWithEmailAndPassword(this._auth, signup.email, signup.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  LogIn() {
    let login = {
      email: document.getElementById('login-email-input').value,
      password: document.getElementById('login-password-input').value,
    };

    signInWithEmailAndPassword(this._auth, login.email, login.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert('Logged In');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  LogOut() {
    let confirmation = confirm('Do you want to sign out?');
    if (confirmation === true) {
      signOut(this._auth)
        .then(() => {
          alert('Signed out');
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
}

export default Firebase;
