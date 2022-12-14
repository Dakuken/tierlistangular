import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Tierlist } from 'src/app/interface/tierlist.interface';

@Component({
  selector: 'app-edit-tierlist',
  templateUrl: './edit-tierlist.component.html',
  styleUrls: ['./edit-tierlist.component.scss'],
  animations: [
    trigger('toggle', [
      state('public', style({ opacity: 0 })),
      state('private', style({ opacity: 1 })),
      transition('public => private', [
        animate('1s ease-out')
      ]),
      transition('private => public', [
        animate('1s ease-out', style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class EditTierlistComponent implements OnInit {
  @Input() tierlist: Tierlist = { author: ' sdf', description: ' sdf', isPublic: false, items: [], name: ' sdfds' }
  @Input() isPublic: boolean = false
  editTitle: boolean = false
  constructor() { }
  ngOnInit(): void {
  }

}
