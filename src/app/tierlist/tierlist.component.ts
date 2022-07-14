import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { ListService } from '../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tierlist',
  templateUrl: './tierlist.component.html',
  styleUrls: ['./tierlist.component.scss']
})
export class TierlistComponent implements OnInit {
  profs!: Prof[] | any[]
  profsSubscription!: Subscription

  constructor(private listService: ListService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getUID()
    const pathId = this.route.snapshot.params['id']
    const auth = getAuth();

    if (pathId !== userId) {
      this.router.navigate(['/petitmalin'])
    }
    // this.router.navigate(['/tierlist', auth.currentUser?.email])
    this.profsSubscription = this.listService.profsSubject.subscribe(
      (profs: Prof[]) => {
        this.profs = profs
      }
    );
    this.listService.getProfs();
    this.listService.emitProfs();


  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.profs, event.previousIndex, event.currentIndex);
  }

  wichPic(name: string) {
    return `../../assets/PhotoProfs/${name.split('.').join('')}.jpg`;
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
    }, 1000);
  }


}