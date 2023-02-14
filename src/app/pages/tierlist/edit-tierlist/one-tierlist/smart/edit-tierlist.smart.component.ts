import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Tierlist} from 'src/app/models/tierlist.model';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ErrorService} from 'src/app/services/error.service';
import {EditTierlistService} from 'src/app/services/tierlist/edit-tierlist.service';
import {SaveTierlistService} from "../../../../../services/tierlist/save-tierlist.service";
import {SuccessService} from "../../../../../services/success.service";
import {Title} from "@angular/platform-browser";
import TierlistItem from "../../../../../models/TierlistItem.model";

@Component({
  selector: 'app-smart-edit-tierlist',
  template: `
      <app-edit-tierlist
              (EditItem)="onEditItem($event)"
              (deleteItem)="onDeleteItem($event)"
              (onSave)="save()"
              [isPublic]="isPublic"
              [tierlist]="tierlist"
                (emitNewItem)="onAddItem($event)"
      >
      </app-edit-tierlist>`,
})
export class SmartEditTierlistComponent implements OnInit {
  tierlist!: Tierlist
  tierlistSubscription!: Subscription
  existSubscription!: Subscription
  exist!: boolean
  messageError: string = ''
  isPublic!: boolean

  constructor(private editTierlistService: EditTierlistService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private saveService: SaveTierlistService, private errorService: ErrorService, private successService: SuccessService, private titleService: Title) {
    this.titleService.setTitle('Edit one of your Tierlist')
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

  async save(tierlistTemp?: Tierlist) {
    let tierlist = tierlistTemp ? tierlistTemp : this.tierlist
    let id = this.authService.getUID()!
    await this.saveService.saveUserTierlist(`${this.tierlist.name}-${id}`, tierlist).then(res => {
      if (res === "success") {
        this.successService.inverse(`Bravo vous avez sauvegarder.`, 2500)
        this.tierlist = tierlist
      }
    }).catch(err => {
      this.errorService.inverse(`Désolé il y a eu une erreur, veuillez réssayer ou me contacter. Code erreur : ${err}`, 6000)
    })
  }


  async onDeleteItem(item: number) {
    let t1 = JSON.parse(JSON.stringify(this.tierlist));
    t1.items.splice(item, 1);
    await this.save(t1);
  }

  async onEditItem(info : [TierlistItem, number]){
    let t1 = JSON.parse(JSON.stringify(this.tierlist));
    let obj = {name : info[0].name, url : info[0].url};
    t1.items.splice(info[1], 1, obj);
    await this.save(t1);
  }

 async onAddItem(tierlistItem : TierlistItem){
    let t1 = JSON.parse(JSON.stringify(this.tierlist));
    t1.items.push(tierlistItem);
    await this.save(t1);
  }
}
