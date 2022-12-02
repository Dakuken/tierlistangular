import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Prof } from 'src/app/interface/Prof.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GetProfService } from 'src/app/services/profService/get-prof.service';
import { SaveProfService } from 'src/app/services/profService/save-prof.service';
@Component({
  selector: 'app-tierlist',
  templateUrl: './tierlist.component.html',
  styleUrls: ['./tierlist.component.scss']
})
export class TierlistComponent implements OnInit {
  profs!: Prof[] | any[]
  profsSubscription!: Subscription
  messageError: string = ''

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private getProf: GetProfService, private saveProfService: SaveProfService) { }

  ngOnInit(): void {
    const userId = this.authService.getUID()
    const pathId = this.route.snapshot.params['id']
    if (pathId !== userId) {
      this.router.navigate(['/petitmalin'])
    }
    this.router.navigate(['/tierlist', this.authService.getUID()])

    this.profsSubscription = this.getProf.profsSubject.subscribe(
      (profs: Prof[]) => {
        this.profs = profs
      }
    );
    this.getProf.emitProfs()

    this.getProf.getProfs()
    //   this.listService.getProfsUser();
    //   setTimeout(() => {
    //     this.messageError = this.listService.messageError
    //   }, 200);

    //   this.listService.emitProfsUser()

    // }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.profs, event.previousIndex, event.currentIndex);
  }

  // wichPic(name: string) {
  //   return this.listService.getProfPic(name)
  // }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;
    moveItemInArray(this.profs, dragIndex, dropIndex);
  }

  save() {
    setTimeout(() => {
      this.saveProfService.writeUserTierlis(this.authService.getUID()!)
    }, 500);
  }


}
