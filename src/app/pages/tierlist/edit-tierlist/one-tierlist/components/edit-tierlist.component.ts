import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Tierlist } from 'src/app/interface/tierlist.interface';
import {CdkDragEnter, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-edit-tierlist',
  templateUrl: './edit-tierlist.component.html',
  styleUrls: ['./edit-tierlist.component.scss']
})
export class EditTierlistComponent implements OnInit {
  @Input() tierlist: Tierlist = { author: ' sdf', description: ' sdf', isPublic: false, items: [], name: ' sdfds' }
  @Input() isPublic!: boolean
  editTitle: boolean = false
  constructor() { }
  ngOnInit(): void {
  }

  save() {
    console.log('save')
    // setTimeout(() => {
    //   this.saveProfService.writeUserTierlis(this.authService.getUID()!)
    // }, 500);
  }


  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;
    moveItemInArray(this.tierlist.items, dragIndex, dropIndex);
  }

}
