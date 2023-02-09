import {Component, Input, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Prof } from '../../interface/Prof.interface';
import { GetProfService } from '../../services/profService/get-prof.service';
import {Tierlist} from "../../models/tierlist.model";
import {AllTierlistService} from "../../services/tierlist/all-tierlist.service";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mobile: boolean = false
  @Input() tierlists!: Tierlist[]


  constructor( private titleService: Title, private allTierlistService : AllTierlistService, private errorService : ErrorService) {
    this.titleService.setTitle('Home Tierlist')
  }

  async ngOnInit() {
    if (window.screen.width <= 400) {
      this.mobile = true;
    }
    await this.allTierlistService.getAllTierlistPublic().then(res => {
      this.tierlists = res
    }).catch(error => {
      this.errorService.inverse(`Désolé il y a eu une erreur, veuillez réssayer ou me contacter. Code erreur : ${error}`, 6000)
    })
  }
}
