import { Injectable } from '@angular/core';
import { onValue, ref } from 'firebase/database';
import { Subject } from 'rxjs';
import { Tierlist } from 'src/app/interface/tierlist.interface';
import { TierlistItem } from 'src/app/interface/tierlistComponent.interface';
import { FireStoreService } from '../fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class GetTierlistService {

  constructor(private fireStoreService: FireStoreService) { }



  getOneTierlist(path: string): Promise<Tierlist> {
    return new Promise((res, rej) => {
      onValue(ref(this.fireStoreService.db, `/tierlist/${path}`), (tierlist) => {
        res(tierlist.val())
      }, {
        onlyOnce: true
      });
    })
  }

  getAllMyTierlist(userId: string): Promise<Tierlist[]> {
    return new Promise((res, rej) => {
      onValue(ref(this.fireStoreService.db, '/tierlist/'), (tierlist) => {
        let myTierlist: Tierlist[] = []
        tierlist.forEach(ele => {
          if (ele.val().author === userId) {
            myTierlist.push(ele.val())
          }
        });
        res(myTierlist)
      }, {
        onlyOnce: true
      });
    })
  }
}
