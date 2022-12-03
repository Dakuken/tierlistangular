import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { User } from '../../models/User.model';
import { FireStoreService } from '../fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private FireStoreService: FireStoreService) { }

  createNewUser(userMoi: User, password: string) {
    const auth = getAuth();
    // const userService = new UsersService(user)
    return new Promise<void>(
      (resolve, reject) => {
        createUserWithEmailAndPassword(auth, userMoi.email, password)
          .then(
            (userCredential) => {
              this.SaveNewUserFireStore(userMoi)
              const user = userCredential.user;
              resolve()
            },
            (error: Error) => {
              reject(error)
            }
          )
      }
    )
  }

  async SaveNewUserFireStore(user: User) {
    const auth = getAuth()
    user.id = auth.currentUser?.uid
    const db = getFirestore(this.FireStoreService.app);
    const id = String(auth.currentUser?.uid)
    await setDoc(doc(db, "users", id), Object.assign({}, user));
  }

  sendSignInLinkToEmail(email: string) {
    const auth = getAuth();
    var actionCodeSettings = {
      url: 'https://final-angular.netlify.app/?email=' + auth.currentUser?.email,
      handleCodeInApp: true,
      // When multiple custom dynamic link domains are defined, specify which
      // one to use.
      dynamicLinkDomain: "example.page.link"
    };
    sendEmailVerification(auth.currentUser!).then(() => {
      console.log("email sent");
    }).catch((error: Error) => {
      console.log('An error happened' + error);
    });
  }

  // Dynamic Links will start with https://prostix.fr/xyz
  // "appAssociation": "AUTO",
  // "rewrites": [{ "source": "/xyz/**", "dynamicLinks": true }]
  //google-site-verification=xwPDowz8YyFrSZuoTqWylQXtArbZmVutZzZ7wnPSC2c

  signInUser(email: string, password: string) {
    const auth = getAuth()
    return new Promise<void>(
      (resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(
            (userCredential) => {
              const user = userCredential.user;
              resolve();
            },
            (error: Error) => {
              reject(error)
            }
          )
      }
    )
  }

  signOutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
    }).catch((error: Error) => {
      console.log('An error happened' + error);
    });
  }

  getUID(): string | undefined {
    const auth = getAuth();
    return auth.currentUser?.uid
  }
}

