import {Injectable} from '@angular/core';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import {FireStoreService} from '../fire-store.service';
import {ref, set} from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private fireStoreService: FireStoreService) {}

  createNewUser(email: string, password: string, pseudo: string) {
    const auth = getAuth();
    // const userService = new UsersService(user)
    return new Promise<void>(
      (resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(
            (userCredential) => {
              this.SaveNewUserFireStore(email, pseudo).then().catch()
              resolve()
            },
            (error: Error) => {
              reject(error)
            }
          )
      }
    )
  }

  async SaveNewUserFireStore(email: string, pseudo: string) {
    const auth = getAuth()
    const id = String(auth.currentUser?.uid)
    return new Promise((res, rej) => {
      set(ref(this.fireStoreService.db, `/users/${id}`), {
        pseudo : pseudo,
        email : email
      })
        .then(() => res("success"))
        .catch(error => rej(error))
    })
  }

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

