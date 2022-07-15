import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { child } from 'firebase/database';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { FireStoreService } from '../services/fire-store.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profs!: Prof[]
  profsSubscription!: Subscription


  constructor(private listService: ListService) { }

  ngOnInit() {
    this.profsSubscription = this.listService.profsSubjectBase.subscribe(
      (profs: Prof[]) => {
        this.profs = profs
      }
    );
    this.listService.getProfsBase();
    this.listService.emitProfsBase();

  }

  wichPic(name: string) {
    return this.listService.getProfPic(name)
  }




}
