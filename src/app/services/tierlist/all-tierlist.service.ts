import {Injectable} from '@angular/core';
import {Tierlist} from 'src/app/models/tierlist.model';
import {GetTierlistService} from './get-tierlist.service';
import {Subject} from 'rxjs'
import {onValue, ref} from 'firebase/database';
import {FireStoreService} from "../fire-store.service";

@Injectable({
  providedIn: 'root'
})
export class AllTierlistService {
  tierlists: Tierlist[] = []
  tierlistsSubject = new Subject<Tierlist[]>()

  constructor(private getTierlistService: GetTierlistService, private firesStoreService: FireStoreService) {
  }

  emitTierlist() {
    this.tierlistsSubject.next(this.tierlists)
  }


  allTierList(userId: string) {
    this.getTierlistService.getAllMyTierlist(userId).then(tierlists => {
      try {
        this.tierlists = tierlists ? tierlists.sort((a, b) => a.name.localeCompare(b.name)) : []
      } catch (er) {
        console.log(er)
        this.tierlists = tierlists
      }
      this.emitTierlist()
    })
  }

  async getAllTierlistPublic(): Promise<Tierlist[]> {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("erreur")
    },10000)
      try {
        onValue(ref(this.firesStoreService.db, "/tierlist/"), (tierlists) => {
          let myTierlist: Tierlist[] = []
          tierlists.forEach(ele => {
            if (ele.val().isPublic && ele.val().name.length >= 3) {
              myTierlist.push(ele.val())
            }
          });
          resolve(myTierlist)
        }, {
          onlyOnce: true

        })
      }
      catch (e){
        reject(e)
      }
    })
  }


}
