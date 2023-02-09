import { Component, OnInit } from '@angular/core';
import {animate, keyframes, stagger, style, transition, trigger} from '@angular/animations';
import { Subscription } from 'rxjs';
import { ErrorService } from './services/error.service';
import {SuccessService} from "./services/success.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('anim', [
      transition(':enter', [
        style({ bottom : "-100px"  }),
        animate('200ms',keyframes([
        style({ bottom : "-100px", offset : 0}),
        style({ bottom : "0px", offset : 0.3}),
        style({ bottom : "10px", offset : 0.6  }),
        style({ bottom : "0px", offset : 1.0  }),
        ])),
      ]),
      transition(':leave', [
        animate('130ms ease-in', style({ bottom : "-100px" }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  // app: FirebaseApp
  errorSubscription!: Subscription
  successSubscription!: Subscription
  hasError: boolean = false

  hasSuccess : boolean = false

  messageErreur : string = ""
  messageSuccess : string = ""

  constructor(private errorService: ErrorService, private successService : SuccessService) {
  }

  closeError(){
    this.hasError = !this.hasError
  }
  closeSuccess(){
    this.hasSuccess = !this.hasSuccess
  }
  ngOnInit() {
    this.errorSubscription = this.errorService.existSubject.subscribe(
      (exist: boolean) => {
        this.hasError = exist
        this.messageErreur = this.errorService.message
      }
    );
    this.errorService.emitBool()

    this.successSubscription = this.successService.existSubject.subscribe(
      (exist: boolean) => {
        this.hasSuccess = exist
        this.messageSuccess = this.successService.message
      }
    );
    this.successService.emitBool()
  }
}
