import {Injectable} from '@angular/core';
import {onValue, ref, set} from 'firebase/database';
import {AuthService} from '../auth/auth.service';
import {FireStoreService} from '../fire-store.service';
import {GetTierlistService} from './get-tierlist.service';

@Injectable({
  providedIn: 'root'
})
export class CreateTierlistService {

  constructor(private fireStoreService: FireStoreService, private authService: AuthService, private getTierlist: GetTierlistService) {
  }

  async createTierlist(data: { name: string, description: string, private: boolean }) {
    return new Promise((resolve, reject) => {
      let id = `${data.name}-${this.authService.getUID()}`
      if (!this.authService.getUID())
        reject("Echec de la création, contacter l'admin ou alors t'es pas connecté fréro")
      let exist: boolean = false
      this.verifAlreadyExist(id).then(res => {
        exist = res

        if (exist) reject('La tierlist existe déjà')
        set(ref(this.fireStoreService.db, `/tierlist/${id}`), {
          name: data.name,
          author: this.authService.getUID(),
          description: data.description,
          isPublic: data.private,
          items: []
        })
          .then(() => resolve('ok'))
          .catch(err => reject(err))
      })
    })
  }

  async verifAlreadyExist(id: string): Promise<boolean> {
    return new Promise((res, rej) => {
      onValue(ref(this.fireStoreService.db, `/tierlist/${id}/`), (tierlist) => {
        console.log(tierlist.val(), tierlist.exists())
        if(tierlist.exists()){
          res(true)
        }else {
          res(false)
        }
      }, {
        onlyOnce: true
      });
    })
  }


}
