import { Injectable } from '@angular/core';
import { Tierlist } from 'src/app/interface/tierlist.interface';
import { GetTierlistService } from './get-tierlist.service';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AllTierlistService {
  tierlists: Tierlist[] = []
  tierlistsSubject = new Subject<Tierlist[]>()

  constructor(private getTierlistService: GetTierlistService) { }

  emitTierlist() {
    this.tierlistsSubject.next(this.tierlists)
  }


  allTierList(userId: string) {
    this.getTierlistService.getAllMyTierlist(userId).then(tierlists => {
      try {
      this.tierlists = tierlists ? tierlists.sort((a, b) => a.name.localeCompare(b.name)) : []
      } catch (er){
        console.log(er)
        this.tierlists = tierlists
      }
      this.emitTierlist()
    })
  }


}
