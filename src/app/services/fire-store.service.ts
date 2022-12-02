import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  app: FirebaseApp

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBLUKDttx5YsoHFBtpZgZZZsoLFFmVwfWc",
      authDomain: "tierlist-portfolio.firebaseapp.com",
      databaseURL: "https://tierlist-portfolio-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "tierlist-portfolio",
      storageBucket: "tierlist-portfolio.appspot.com",
      messagingSenderId: "1046638130832",
      appId: "1:1046638130832:web:e4ff8675b30045ba11ca15",
      measurementId: "G-NF0PG13P0D"
    };


    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
  }
}
