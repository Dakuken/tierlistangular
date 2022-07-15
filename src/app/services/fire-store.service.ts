import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  app: FirebaseApp

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDTJNUAFKIHhwOzPz0D2pBiVK2a23Glvxw",
      authDomain: "angular20-32ea6.firebaseapp.com",
      databaseURL: "https://angular20-32ea6-default-rtdb.firebaseio.com",
      projectId: "angular20-32ea6",
      storageBucket: "gs://angular20-32ea6.appspot.com",
      messagingSenderId: "273572570575",
      appId: "1:273572570575:web:a1ba09106220abbcfb5eba",
      measurementId: "G-0LRBM67W8C"
    };

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(this.app);
    // this.pouet()
  }

  async pouet() {
    const db = getFirestore(this.app);
    let prof = [
      {
        "id": "1",
        "name": "A.SPENGLER",
        "order": 1
      },
      {
        "id": "2",
        "name": "L.ZERTAL",
        "order": 2
      },
      {
        "id": "3",
        "name": "B.HEULLUY",
        "order": 3
      },
      {
        "id": "4",
        "name": "N.GINOUX",
        "order": 4
      },
      {
        "id": "5",
        "name": "N.BOUGDIRA",
        "order": 5
      },
      {
        "id": "6",
        "name": "M.MARTINEZ",
        "order": 6
      },
      {
        "id": "7",
        "name": "S.MINICH",
        "order": 7
      },
      {
        "id": "8",
        "name": "M.AILLERIE",
        "order": 8
      },
      {
        "id": "9",
        "name": "P.MELY",
        "order": 9
      },
      {
        "id": "10",
        "name": "I.KADRI",
        "order": 10
      },
      {
        "id": "11",
        "name": "D.BORDIER",
        "order": 11
      },
      {
        "id": "12",
        "name": "R.JAGER",
        "order": 12
      },
      {
        "id": "13",
        "name": "M.COQUILLAT",
        "order": 13
      },
      {
        "id": "14",
        "name": "C.GROUTSCH",
        "order": 14
      },
      {
        "id": "15",
        "name": "Y.GROUTSCH",
        "order": 15
      },
      {
        "id": "16",
        "name": "S.MESSAOUDI",
        "order": 16
      },
      {
        "id": "17",
        "name": "P.NITSCHKE",
        "order": 17
      },
      {
        "id": "18",
        "name": "P.LAROCHE",
        "order": 18
      },
      {
        "id": "19",
        "name": "N.JOZEFOWIEZ",
        "order": 19
      },
      {
        "id": "20",
        "name": "R.FREYDIGER",
        "order": 20
      }
    ]
    try {
      for (let i = 0; i < prof.length; i++) {
        prof[i].order = i + 1;
        await setDoc(doc(db, `profs`, prof[i].id), Object.assign({}, prof[i]));
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
