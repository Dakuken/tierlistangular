import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Tierlist} from 'src/app/models/tierlist.model';
import {AuthService} from 'src/app/services/auth/auth.service';
import {TierlistNotExistService} from 'src/app/services/tierlist-not-exist.service';
import {EditTierlistService} from 'src/app/services/tierlist/edit-tierlist.service';
import {SaveTierlistService} from "../../../../../services/tierlist/save-tierlist.service";

@Component({
  selector: 'app-smart-edit-tierlist',
  template: `
    <app-edit-tierlist [tierlist]="tierlist" [isPublic]="isPublic" (onSave)="save()"></app-edit-tierlist>`,
})
export class SmartEditTierlistComponent implements OnInit {
  tierlist!: Tierlist
  tierlistSubscription!: Subscription
  existSubscription!: Subscription
  exist!: boolean
  messageError: string = ''
  isPublic!: boolean

  constructor(private editTierlistService: EditTierlistService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private existService: TierlistNotExistService, private saveService: SaveTierlistService) {
  }

  ngOnInit(): void {
    const userId = this.authService.getUID()
    const pathId = this.route.snapshot.params['userId']
    const tierlistId = this.route.snapshot.params['tierlistId']
    if (pathId !== userId) {
      this.router.navigate(['/petitmalin'])
    }

    this.editTierlistService.whichTierlist(tierlistId).then(res => {
        if (!res) {
          this.existService.inverse("Tu t'es trompé de tierlist mon coco")
          this.router.navigate(['/Edit-Tierlist', this.authService.getUID()])
        }
        this.tierlist = res;
        if (!this.tierlist.items) {
          this.tierlist.items = []
        }
        this.isPublic = this.tierlist.isPublic
      }
    )


    // this.tierlistSubscription = this.editTierlistService.tierlistSubject.subscribe((tierlist: Tierlist) => {
    //     if (!tierlist) return
    //     this.tierlist = tierlist
    //     if (!this.tierlist.items) {
    //       this.tierlist.items = []
    //     }
    //     this.isPublic = this.tierlist.isPublic
    //
    //     console.log(this.tierlist.name)
    //   }
    // );
    //
    // this.existSubscription = this.existService.existSubject.subscribe(
    //   (exist: boolean) => {
    //     this.exist = exist
    //   }
    // );
    // this.existService.emitBool()
    //
    //
    // this.editTierlistService.emitTierlist()
    // this.editTierlistService.whichTierlist(tierlistId).then(res => {
    //   if (!res) {
    //     this.existService.inverse()
    //     this.router.navigate(['/Edit-Tierlist', this.authService.getUID()])
    //   }
    // })

  }

  async save() {
    console.log('save')
    console.log(this.tierlist.name)
    let id = this.authService.getUID()!
    await this.saveService.saveUserTierlist(`${this.tierlist.name}-${id}`, this.tierlist)
  }
}
