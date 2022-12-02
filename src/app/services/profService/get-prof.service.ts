import { Injectable } from '@angular/core';
import { ref, onValue } from "firebase/database";
import { Subject } from 'rxjs'
import { Prof } from '../../interface/Prof.interface';
import { ProfService } from './prof-service.service';
@Injectable({
  providedIn: 'root'
})
export class GetProfService {


  profs: Prof[] = [];
  profsSubject = new Subject<Prof[]>();


  constructor(private prof: ProfService) { }

  emitProfs() {
    this.profsSubject.next(this.profs)
  }

  getProfs() {
    onValue(ref(this.prof.db, '/prof/'), (profs) => {
      this.profs = profs.val() ? profs.val() : [];
      this.emitProfs()
    }, {
      onlyOnce: true
    });
    console.log('getprofs', this.profs);
  }
}
