import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class TierlistNotExistService {
  exist: boolean = false
  existSubject = new Subject<boolean>()
  message: string =""

  constructor() { }

  emitBool() {
    this.existSubject.next(this.exist)
  }

  inverse(messageErreur : string) {
    this.message = messageErreur
    this.exist = !this.exist
    this.emitBool()
    setTimeout(() => {
      this.exist = !this.exist
      this.emitBool()
    }, 3000);
  }
}
