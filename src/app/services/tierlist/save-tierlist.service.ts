import {Injectable} from '@angular/core';
import {FireStoreService} from "../fire-store.service";
import {ref, set} from "firebase/database";
import {Tierlist} from "../../models/tierlist.model";

@Injectable({
  providedIn: 'root'
})
export class SaveTierlistService {

  constructor(private fireStoreService: FireStoreService) {}

  async saveUserTierlist(tierlistName: string, tierlist: Tierlist) {
    return new Promise((res, rej) => {
      set(ref(this.fireStoreService.db, `/tierlist/${tierlistName}`), {
        author: tierlist.author,
        items: tierlist.items,
        name: tierlist.name,
        isPublic: tierlist.isPublic,
        description: tierlist.description
      })
        .then(() => res("success"))
        .catch(error => rej(error))
    })

  }
}
