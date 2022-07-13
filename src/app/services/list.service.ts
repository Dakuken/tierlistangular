import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { getDatabase, onValue, ref, DataSnapshot } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  profs: Prof[] = [];
  profsSubject = new Subject<Prof[]>();
  constructor() { }

  emitProfs() {
    this.profsSubject.next(this.profs)
  }

  // saveOrderSurtout() {
  //   const db = getDatabase();
  //   set(ref(db, '/'), this.profs);
  // }

  getProfs() {
    const db = getDatabase();
    const reference = ref(db, '/prof');
    onValue(reference, (data: DataSnapshot) => {
      this.profs = data.val() ? data.val() : []
      this.emitProfs();
    })
  }
}
