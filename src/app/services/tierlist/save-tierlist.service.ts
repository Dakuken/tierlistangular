import {Injectable} from '@angular/core';
import {FireStoreService} from "../fire-store.service";
import {ref, set} from "firebase/database";
import TierlistItem from "../../models/TierlistItem.model";
import {Tierlist} from "../../models/tierlist.model";

@Injectable({
  providedIn: 'root'
})
export class SaveTierlistService {

  constructor(private fireStoreService: FireStoreService) {
  }

  async saveUserTierlist(tierlistName: string, tierlist : Tierlist) {
    await set(ref(this.fireStoreService.db, `/tierlist/${tierlistName}`), {
      author : tierlist.author,
      items : tierlist.items,
      name : tierlist.name,
      isPublic : tierlist.isPublic,
      description : tierlist.description
    });
  }
}
