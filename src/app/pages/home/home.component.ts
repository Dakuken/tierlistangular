import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Prof } from '../../interface/Prof.interface';
import { GetProfService } from '../../services/profService/get-prof.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profs: Prof[] = []
  profsSubscription!: Subscription
  mobile: boolean = false
  messageError: string = ''


  constructor(private getProfService: GetProfService, private titleService: Title) {
    this.titleService.setTitle('Menu tierlist')
  }

  ngOnInit(): void {
    if (window.screen.width <= 400) {
      this.mobile = true;
    }
  }

  // ngOnInit() {
  //   this.profsSubscription = this.getProfService.profsSubject.subscribe(
  //     (profs) => {
  //       this.profs = profs
  //     });
  //   this.getProfService.emitProfs()
  //   this.getProfService.getProfs()
  //   console.log('ahaha');
  // }

  // showProfs() {
  //   console.log(this.profs);
  // }
}
