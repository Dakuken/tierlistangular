import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SuccessService {
  exist: boolean = false
  existSubject = new Subject<boolean>()
  message: string =""

  constructor() { }

  emitBool() {
    this.existSubject.next(this.exist)
  }

  inverse(message : string, time = 3000) {
    this.message = message
    this.exist = !this.exist
    this.emitBool()
    setTimeout(() => {
      this.exist = !this.exist
      this.emitBool()
    }, time);
  }
}
