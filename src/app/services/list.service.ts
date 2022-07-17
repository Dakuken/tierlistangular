import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { AuthService } from './auth.service';
import { collection, getDocs, getFirestore, setDoc, Firestore, query, doc, orderBy } from "firebase/firestore";
import { FireStoreService } from './fire-store.service';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  profsUser: Prof[] = [];
  profsBase: Prof[] = []
  profsBaseTemp: Prof[] = []
  profsSubjectUser = new Subject<Prof[]>();
  profsSubjectBase = new Subject<Prof[]>();
  messageError = ''
  constructor(private authService: AuthService, private fireStore: FireStoreService) { }
  id: any = []
  data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  emitProfsUser() {
    this.profsSubjectUser.next(this.profsUser)
  }
  emitProfsBase() {
    this.profsSubjectBase.next(this.profsBase)
  }

  async saveOrderSurtout() {
    const id = this.authService.getUID()
    const db = getFirestore(this.fireStore.app);

    try {
      for (let i = 0; i < this.profsUser.length; i++) {
        this.profsUser[i].order = i + 1;
        await setDoc(doc(db, `users/${id}/list`, this.profsUser[i].id), Object.assign({}, this.profsUser[i]));
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  async getProfsUser() {
    // const id = this.authService.getUID()
    if (this.profsUser.length !== 0) {
      return
    }
    const auth = getAuth()
    const id = auth.currentUser?.uid
    let path = `users/${id}/list`
    this.pouet(path)


  }

  async getProfsBase() {
    if (this.profsBase.length !== 0) {
      return
    }

    await this.getId()
    this.pouet()


    await setTimeout(() => {
      this.classement()
    }, 500);
  }

  classement() {
    for (let i = 0; i <= this.profsBaseTemp.length - 1; i++) {
      this.profsBaseTemp[i].order = this.data[i];
    }
    this.profsBaseTemp.sort((a, b) => a.order - b.order)
    this.profsBase = this.profsBaseTemp
    this.emitProfsBase()

  }


  async pouet(path: string = 'profs') {
    try {
      const db = getFirestore(this.fireStore.app);
      if (path === 'profs') {

        const q = query(collection(db, path), orderBy('id'))
        let querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let x = doc.data()
          this.profsBaseTemp.push(new Prof(x['id'], x['name'], x['order']))
          this.profsBaseTemp.sort((a: Prof, b: Prof) => Number(a.id) - Number(b.id))

        })


      } else {
        const q = query(collection(db, path))
        let querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          const q = query(collection(db, 'profs'))
          try {
            let querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              let x = doc.data()
              this.profsUser.push(new Prof(x['id'], x['name'], x['order']))
              this.profsUser.sort((a: Prof, b: Prof) => a.order - b.order)
            })
          } catch (error) {
            this.messageError = String(error)
          }
        } else {
          const q = query(collection(db, path))
          querySnapshot.forEach((doc) => {
            let x = doc.data()
            this.profsUser.push(new Prof(x['id'], x['name'], x['order']))
            this.profsUser.sort((a: Prof, b: Prof) => a.order - b.order)
          })
        }

      }
    } catch (error) {
      console.log(String(error))
      this.messageError = String(error)

    }
  }



  async getId() {
    const db = getFirestore(this.fireStore.app);
    const q = query(collection(db, 'users'))
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let x = doc.id
      this.id.push(x)
    })
    this.getList()
  }

  async getList() {
    var y = 0
    const db = getFirestore(this.fireStore.app);
    for (let i = 0; i <= this.id.length - 1; i++) {
      const q = query(collection(db, `users/${this.id[i]}`, 'list'), orderBy('order'))
      let querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let x = doc.data()
        let a = x['id']
        let b = x['order']
        this.data[a - 1] += b
      })

    }
    let pouet = this.data.reduce((a, b) => a + b)
    for (let i = 0; i <= this.data.length - 1; i++) {
      this.data[i] = this.data[i] / this.id.length
    }
  }

  getProfPic(name: string) {
    return `../../assets/PhotoProfs/${name.split('.').join('')}.jpg`;
  }
}
