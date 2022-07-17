import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { ListService } from '../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tierlist',
  templateUrl: './tierlist.component.html',
  styleUrls: ['./tierlist.component.scss']
})
export class TierlistComponent implements OnInit {
  profs!: Prof[] | any[]
  profsSubscription!: Subscription
  messageError: string = ''

  constructor(private listService: ListService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUID()
    const pathId = this.route.snapshot.params['id']
    const auth = getAuth();

    if (pathId !== userId) {
      this.router.navigate(['/petitmalin'])
    }
    // this.router.navigate(['/tierlist', this.authService.getUID()])
    this.profsSubscription = this.listService.profsSubjectUser.subscribe(
      (profs: Prof[]) => {
        this.profs = profs
      }
    );
    this.listService.getProfsUser();
    setTimeout(() => {
      this.messageError = this.listService.messageError
    }, 200);

    this.listService.emitProfsUser()

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.profs, event.previousIndex, event.currentIndex);
  }

  wichPic(name: string) {
    return this.listService.getProfPic(name)
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;
    moveItemInArray(this.profs, dragIndex, dropIndex);
  }

  save() {
    setTimeout(() => {
      this.listService.saveOrderSurtout()
    }, 500);
  }


}