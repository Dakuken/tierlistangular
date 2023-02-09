import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tierlist} from 'src/app/models/tierlist.model';
import {CdkDragEnter, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-edit-tierlist',
  templateUrl: './edit-tierlist.component.html',
  styleUrls: ['./edit-tierlist.component.scss']
})
export class EditTierlistComponent implements OnInit {
  @Input() tierlist!: Tierlist
  @Input() isPublic!: boolean

  @Output() onSave: EventEmitter<any> = new EventEmitter()
  editTitle: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }


  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;
    moveItemInArray(this.tierlist.items, dragIndex, dropIndex);
  }

  onSaveEmit() {
    setTimeout(
      () => {
        this.onSave.emit("true")
      }, 500)
  }

}
