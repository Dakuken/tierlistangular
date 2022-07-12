import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { ReplaySubject } from 'rxjs';
import { User } from '../models/User.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }

  createNewUser(user: User, password: string) {
    const userService = new UsersService(user)
    const auth = getAuth();
    return new Promise<void>(
      (resolve, reject) => {
        createUserWithEmailAndPassword(auth, user.email, password)
          .then(
            () => {
              userService.createNewUser(user)
              resolve()
            },
            (error: Error) => {
              reject(error)
            }
          )
      }
    )

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
            () => {
              resolve();
            },
            (error: Error) => {
              reject
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
}
