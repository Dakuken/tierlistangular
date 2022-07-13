import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  // users: { name: string, title: string }[] = [
  //   { name: 'Carla Espinosa', title: 'Nurse' },
  //   { name: 'Bob Kelso', title: 'Doctor of Medicine' },
  //   { name: 'Janitor', title: 'Janitor' },
  //   { name: 'Perry Cox', title: 'Doctor of Medicine' },
  //   { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  // ];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  profs!: Prof[] | any[]
  profs1: string[] = []
  profs2: string[] = []
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

        for (let prof = 0; prof <= this.profs.length - 1; prof++) {
          if (prof < 10) {
            console.log(this.profs[prof].name);

            this.profs1.push(this.profs[prof].name)
          } else {
            console.log(this.profs[prof].name);
            this.profs2.push(this.profs[prof].name)
          }
        }
      }
    );
    this.listService.getProfs();
    this.listService.emitProfs();


  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  //! onSave(){} pour plus tard je pense
  test() {
    console.log('test');
    console.log(this.profs);

  }

  wichPic(name: string) {
    return `../../assets/PhotoProfs/${name.split('.').join('')}.jpg`;
  }
}
