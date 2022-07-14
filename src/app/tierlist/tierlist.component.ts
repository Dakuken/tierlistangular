import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { ListService } from '../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-tierlist',
  templateUrl: './tierlist.component.html',
  styleUrls: ['./tierlist.component.scss']
})
export class TierlistComponent implements OnInit {
  profs!: Prof[] | any[]
  profsSubscription!: Subscription

  constructor(private listService: ListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    const auth = getAuth();
    let userEmail = auth.currentUser?.email
    if (id !== userEmail) {
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

  //! onSave(){} pour plus tard je pense
  test() {
    console.log('test');
    console.log(this.profs);
  }

  wichPic(name: string) {
    return `../../assets/PhotoProfs/${name.split('.').join('')}.jpg`;
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    // const phContainer = dropList.element.nativeElement;
    // const phElement = phContainer.querySelector('.cdk-drag-placeholder');
    // phContainer.removeChild(phElement!);
    // phContainer.parentElement!.insertBefore(phElement!, phContainer);

    moveItemInArray(this.profs, dragIndex, dropIndex);
  }
}
