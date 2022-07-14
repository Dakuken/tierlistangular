import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { getDatabase, onValue, ref, DataSnapshot, set } from "firebase/database";
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  profs: Prof[] = [];
  profsSubject = new Subject<Prof[]>();
  constructor() { }

  emitProfs() {
    this.profsSubject.next(this.profs)
    console.log('done');

  }

  saveOrderSurtout() {
    const auth = getAuth()
    const email = auth.currentUser?.email
    const db = getDatabase();
    set(ref(db, `/email/${(email!.split('.')).join("")}/list`), this.profs).then(() => {
      console.log('saved');
    }
    ).catch((error) => {
      console.log(error);
    }
    )


    console.log('doneee');

  }

  getProfs(userId: string) {
    const db = getDatabase();
    const reference = ref(db, `/email/${userId}/list`);
    onValue(reference, (data: DataSnapshot) => {
      this.profs = data.val() ? data.val() : this.getProfsBase();
      this.emitProfs();
    },
      (error) => {
        console.log(error);
      })
  }

  getProfsBase() {
    const db = getDatabase();
    const reference = ref(db, `/prof`);
    onValue(reference, (data: DataSnapshot) => {
      this.profs = data.val() ? data.val() : [];
      this.emitProfs();
    },
      (error) => {
        console.log(error);
      })
  }
}
