import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-petitmalin',
  templateUrl: './petitmalin.component.html',
  styleUrls: ['./petitmalin.component.scss']
})
export class PetitmalinComponent implements OnInit {

  constructor(private  titleService : Title) {
    this.titleService.setTitle("Bah alors on s'est perdu ? ")
  }

  ngOnInit(): void {
  }

}
