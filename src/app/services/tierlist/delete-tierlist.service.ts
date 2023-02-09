import {Injectable} from '@angular/core';
import {FireStoreService} from "../fire-store.service";
import {ref, set} from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class DeleteTierlistService {

  constructor(private fireStoreService: FireStoreService) {
  }

  async deleteUserTierlist(tierlistName: string) :  Promise<string> {
    return new Promise((res, rej) => {
      set(ref(this.fireStoreService.db, `/tierlist/${tierlistName}`), {
        items: []
      }).then(() => {
        res("success")
      }).catch((error) => {
        rej(error)
      })
    })
  }
}
