import { Injectable } from '@angular/core';
import { get, onValue, ref, set } from 'firebase/database';
import { AuthService } from '../auth/auth.service';
import { FireStoreService } from '../fire-store.service';
import { GetTierlistService } from './get-tierlist.service';

@Injectable({
  providedIn: 'root'
})
export class CreateTierlistService {

  constructor(private fireStoreService: FireStoreService, private authService: AuthService, private getTierlist: GetTierlistService) { }

  async createTierlist(data: { name: string, description: string, private: boolean }): Promise<string> {
    let id = `${data.name}-${this.authService.getUID()}`
    if (!this.authService.getUID())
      return "Echec de la création, contacter l'admin ou alors t'es pas connecté fréro"

    let exist: boolean = false
    await this.verifAlreadyExist(id).then(res => exist = res)
    if (exist) return 'wesh ça existe déjà fréro'
    set(ref(this.fireStoreService.db, `/tierlist/${id}`), {
      name: data.name,
      author: this.authService.getUID(),
      description: data.description,
      isPublic: data.private,
      items: []
    });
    return 'ok'
  }

  verifAlreadyExist(id: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.getTierlist.getOneTierlist(`/tierlist/${id}`).then(data => data ? res(true) : res(false))
    })
  }


}
