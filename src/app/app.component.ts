import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { TierlistNotExistService } from './services/tierlist-not-exist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('anim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  // app: FirebaseApp
  existSubscription!: Subscription
  exist: boolean = false
  constructor(private existService: TierlistNotExistService) {
  }

  ngOnInit() {
    this.existSubscription = this.existService.existSubject.subscribe(
      (exist: boolean) => {
        this.exist = exist
      }
    );
    this.existService.emitBool()

  }
}
