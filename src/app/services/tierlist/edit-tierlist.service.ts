import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tierlist } from 'src/app/interface/tierlist.interface';
import { TierlistItem } from 'src/app/interface/tierlistComponent.interface';
import { GetTierlistService } from './get-tierlist.service';

@Injectable({
  providedIn: 'root'
})
export class EditTierlistService {
  tierlist!: Tierlist;
  tierlistSubject = new Subject<Tierlist>();

  constructor(private getTierlistService: GetTierlistService) { }

  emitTierlist() {
    this.tierlistSubject.next(this.tierlist)
  }


  whichTierlist(path: string): Promise<Tierlist> {
    return new Promise((res, rej) => {
      this.getTierlistService.getOneTierlist(path).then(tierlist => {
        this.tierlist = tierlist
        this.emitTierlist()
        res(tierlist)
      })
    })
  }
}
