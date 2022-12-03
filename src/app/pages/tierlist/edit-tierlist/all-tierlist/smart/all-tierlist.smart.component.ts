import { Component, OnInit } from '@angular/core';
import { Tierlist } from 'src/app/interface/tierlist.interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllTierlistService } from 'src/app/services/tierlist/all-tierlist.service';

@Component({
  selector: 'app-smart-all-tierlist',
  template: `<app-all-tierlist [tierlists]='tierlists' (editTierlist)="onEditTierlist($event)"></app-all-tierlist>`,
})
export class SmartAllTierlistComponent implements OnInit {

  tierlists: Tierlist[] = []
  tierlistSubscription!: Subscription
  messageError: string = ''

  constructor(private alltierlistService: AllTierlistService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const userId = this.authService.getUID()
    const pathId = this.route.snapshot.params['userId']
    if (pathId !== userId) {
      this.router.navigate(['/petitmalin'])
    }
    //TODO Verif si la tierlist existe, si non retour au choix tierlist
    // this.router.navigate(['/edit-tierlist', this.authService.getUID()])

    this.tierlistSubscription = this.alltierlistService.tierlistsSubject.subscribe(
      (tierlists: Tierlist[]) => {
        this.tierlists = tierlists
      }
    );
    this.alltierlistService.emitTierlist()
    this.alltierlistService.allTierList(userId!)
  }

  onEditTierlist(tierlist: Tierlist) {
    this.router.navigate(['Edit-Tierlist', this.authService.getUID(), `${tierlist.name}-${this.authService.getUID()}`])
  }
}
