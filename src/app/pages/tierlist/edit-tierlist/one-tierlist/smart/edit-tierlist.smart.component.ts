import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Tierlist} from 'src/app/models/tierlist.model';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ErrorService} from 'src/app/services/error.service';
import {EditTierlistService} from 'src/app/services/tierlist/edit-tierlist.service';
import {SaveTierlistService} from "../../../../../services/tierlist/save-tierlist.service";
import {SuccessService} from "../../../../../services/success.service";

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

  constructor(private editTierlistService: EditTierlistService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private saveService: SaveTierlistService, private errorService: ErrorService, private successService : SuccessService) {
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
          this.errorService.inverse("Tu t'es trompé de tierlist mon coco")
          this.router.navigate(['/Edit-Tierlist', this.authService.getUID()])
        }
        this.tierlist = res;
        if (!this.tierlist.items) {
          this.tierlist.items = []
        }
        this.isPublic = this.tierlist.isPublic
      }
    )

  }

  async save() {
    let id = this.authService.getUID()!
    await this.saveService.saveUserTierlist(`${this.tierlist.name}-${id}`, this.tierlist).then(res => {
      if (res === "success") {
        this.successService.inverse(`Bravo vous avez sauvegarder.`, 2500)
      }
    }).catch(err => {
      this.errorService.inverse(`Désolé il y a eu une erreur, veuillez réssayer ou me contacter. Code erreur : ${err}`, 6000)
    })
  }
}
