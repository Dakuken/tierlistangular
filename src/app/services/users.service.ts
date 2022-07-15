import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';
import { getDatabase, set, ref, get, child } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userSubject = new Subject<User>()

  constructor(private user: User) { }



  getUser(userId: string) {
    const dbRef = ref(getDatabase());
    return new Promise<User>(
      (resolve, reject) => {
        get(child(dbRef, `/ email / ${userId} `)).then((snapshot) => {
          if (snapshot.exists()) {
            resolve(<User>snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          reject(error);
        })
      }
    )
  }






}
