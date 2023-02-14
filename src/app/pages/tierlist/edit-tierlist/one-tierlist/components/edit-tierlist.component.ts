import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tierlist} from 'src/app/models/tierlist.model';
import {CdkDragEnter, moveItemInArray} from "@angular/cdk/drag-drop";
import TierlistItem from "../../../../../models/TierlistItem.model";

@Component({
  selector: 'app-edit-tierlist',
  templateUrl: './edit-tierlist.component.html',
  styleUrls: ['./edit-tierlist.component.scss']
})
export class EditTierlistComponent implements OnInit {
  @Input() tierlist!: Tierlist
  @Input() isPublic!: boolean

  @Output() onSave: EventEmitter<any> = new EventEmitter()
  @Output() deleteItem: EventEmitter<number> = new EventEmitter()

  @Output() EditItem : EventEmitter<[TierlistItem,number]> = new EventEmitter<[TierlistItem, number]>()
  @Output() emitNewItem : EventEmitter<TierlistItem> = new EventEmitter<TierlistItem>()

  oneItemIsEdited: boolean = false
  editTitle: boolean = false

  currentEdited : number = -1

  constructor() {
  }

  ngOnInit(): void {
  }


  dragEntered(event: CdkDragEnter<number>) {
    console.log('eeee')
    setTimeout(() => {
      console.log('laa')
      if (this.oneItemIsEdited) {
        return
      }
      const drag = event.item;
      const dropList = event.container;
      const dragIndex = drag.data;
      const dropIndex = dropList.data;
      moveItemInArray(this.tierlist.items, dragIndex, dropIndex);
      console.log('llll')
    }, 300)
  }

  onSaveEmit() {
    setTimeout(
      () => {
        this.onSave.emit("true")
      }, 500)
  }

  onDeleteItem(item: number) {
    this.deleteItem.emit(item)
  }

  onItemEdited(bool: boolean, index : number) {
    this.oneItemIsEdited = bool
    this.currentEdited = index

  }

  oneItemIsEditedFinish(item : TierlistItem){
    this.EditItem.emit([item,this.currentEdited])
    this.oneItemIsEdited = false;
  }

  onAddNewItem(tierlistItem : TierlistItem){
    this.emitNewItem.emit(tierlistItem)
  }

}
