import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { getDatabase, onValue, ref, DataSnapshot, set } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  profs: Prof[] = [];
  profsSubject = new Subject<Prof[]>();
  constructor(private authService: AuthService) { }

  emitProfs() {
    this.profsSubject.next(this.profs)

  }

  saveOrderSurtout() {
    const id = this.authService.getUID()
    const db = getDatabase();
    set(ref(db, `/email/${id}/list`), this.profs).then(() => {
      console.log('saved');
    }
    ).catch((error) => {
      console.log(error);
    }
    )
  }

  getProfs() {
    const id = this.authService.getUID()

    const db = getDatabase();
    const reference = ref(db, `/email/${id}/list`);
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
