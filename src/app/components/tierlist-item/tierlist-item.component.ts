import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import TierlistItem from "../../models/TierlistItem.model";
import {animate, animateChild, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-tierlist-item',
  templateUrl: './tierlist-item.component.html',
  styleUrls: ['./tierlist-item.component.scss'],

})
export class TierlistItemComponent implements OnInit {
  @Input() name: string = ' '
  @Input() url : string = ' '
  @Input() order : number = 0

  @Input() canEdit = false

  @Output() deleteItemEmit : EventEmitter<any> = new EventEmitter<any>()
  @Output() onSave : EventEmitter<TierlistItem> = new EventEmitter()

  @Output() onEditedItem : EventEmitter<boolean> = new EventEmitter()




  constructor() { }

  ngOnInit(): void {

  }





  deleteItem(){
  this.deleteItemEmit.emit("item delete")
  }


  onEdit(){
    this.onEditedItem.emit(true)
  }

}
