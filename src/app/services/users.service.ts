import {Injectable} from '@angular/core';
import {onValue, ref, set} from "firebase/database";
import {FireStoreService} from "./fire-store.service";
import {AuthService} from "./auth/auth.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isModified: boolean = false
  modifiedSubject = new Subject<boolean>()

  emitModifyChange() {
    this.modifiedSubject.next(this.isModified)
  }

  modifyChange() {
    this.isModified = !this.isModified
    this.emitModifyChange()
    console.log('laa', this.isModified);
  }

  constructor(private fireStoreService: FireStoreService, private auth: AuthService) {
  }

  async getPseudo(id: string): Promise<string> {
    return new Promise((res, rej) => {
      onValue(ref(this.fireStoreService.db, `/users/${id}/pseudo`), (user) => {
        if (user.exists()) {
          res(user.val() as string)
        } else {
          rej('pasok')
        }
      }, {
        onlyOnce: true
      });
    })
  }

  async getEmailPseudo(): Promise<{ email: string, pseudo: string }> {
    await this.sleep(100)
    let id = this.auth.getUID()
    return new Promise((resolve, reject) => {
      onValue(ref(this.fireStoreService.db, `/users/${id}`), (user) => {
        if (user.exists()) {
          resolve(user.val())
        } else {
          reject(user)
        }
      })
    })
  }

  sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async saveUser(pseudo: string, email: string) {
    let id = this.auth.getUID()
    return new Promise((res, rej) => {
      set(ref(this.fireStoreService.db, `/users/${id}`), {
        pseudo: pseudo,
        email: email
      })
        .then(() => res("success"))
        .catch(error => rej(error))
    })

  }

}
