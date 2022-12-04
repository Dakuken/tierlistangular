import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tierlist } from 'src/app/interface/tierlist.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TierlistNotExistService } from 'src/app/services/tierlist-not-exist.service';
import { EditTierlistService } from 'src/app/services/tierlist/edit-tierlist.service';
@Component({
  selector: 'app-smart-edit-tierlist',
  template: `<app-edit-tierlist [tierlist]="tierlist" [isPublic]="isPublic"></app-edit-tierlist>`,
})
export class SmartEditTierlistComponent implements OnInit {
  tierlist!: Tierlist
  tierlistSubscription!: Subscription
  existSubscription!: Subscription
  exist!: boolean
  messageError: string = ''
  isPublic!: boolean

  constructor(private editTierlistService: EditTierlistService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private existService: TierlistNotExistService) { }

  ngOnInit(): void {
    const userId = this.authService.getUID()
    const pathId = this.route.snapshot.params['userId']
    const tierlistId = this.route.snapshot.params['tierlistId']
    if (pathId !== userId) {
      this.router.navigate(['/petitmalin'])
    }


    this.tierlistSubscription = this.editTierlistService.tierlistSubject.subscribe(
      (tierlist: Tierlist) => {
        this.tierlist = tierlist
        this.isPublic = this.tierlist.isPublic
      }
    );

    this.existSubscription = this.existService.existSubject.subscribe(
      (exist: boolean) => {
        this.exist = exist
      }
    );
    this.existService.emitBool()


    this.editTierlistService.emitTierlist()
    this.editTierlistService.whichTierlist(tierlistId).then(res => {
      if (!res) {
        this.existService.inverse()
        this.router.navigate(['/Edit-Tierlist', this.authService.getUID()])
      }
    })





  }
}
