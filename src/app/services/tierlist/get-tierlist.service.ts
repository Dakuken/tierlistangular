import { Injectable } from '@angular/core';
import { onValue, ref } from 'firebase/database';
import { Tierlist } from 'src/app/models/tierlist.model';
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
