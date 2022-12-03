import { Injectable } from '@angular/core';
import { ref, onValue } from "firebase/database";
import { Subject } from 'rxjs'
import { Prof } from '../../interface/Prof.interface';
import { FireStoreService } from '../fire-store.service';
@Injectable({
  providedIn: 'root'
})
export class GetProfService {


  profs: Prof[] = [];
  profsSubject = new Subject<Prof[]>();


  constructor(private fireStoreService: FireStoreService) { }

  emitProfs() {
    this.profsSubject.next(this.profs)
  }

  getProfs() {
    onValue(ref(this.fireStoreService.db, '/prof/'), (profs) => {
      this.profs = profs.val() ? profs.val() : [];
      this.emitProfs()
    }, {
      onlyOnce: true
    });
    console.log('getprofs', this.profs);
  }
}
