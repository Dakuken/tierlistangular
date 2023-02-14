import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import TierlistItem from "../../models/TierlistItem.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, animateChild, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-editable-tierlist-item',
  templateUrl: './editable-tierlist-item.component.html',
  styleUrls: ['./editable-tierlist-item.component.scss'],
  animations: [
    trigger('grow', [
      state('false', style({height: '50px'})),
      state('true', style({height: '70px'})),
      transition('false => true', [
        style({height: '50px'}),
        animate('1s ease', style({height: '70px'})),
        group([query('@errorAnimation', animateChild())])
      ]),
      transition('true => false', [
        style({height: '70px'}),
        animate('1s ease', style({height: '50px'})),
        group([query('@errorAnimation', animateChild())])
      ]),
    ]),

    //? child
    trigger('errorAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('2s', keyframes([
          style({opacity: 0, offset: 0.5}),
          style({opacity: 1, offset: 0.7})
        ]))
      ]),
      transition(':leave', [
        animate('0.150s', style({opacity: 0}),)
      ]),
    ]),
  ]
})
export class EditableTierlistItemComponent implements OnInit {
  @Output() onSave : EventEmitter<TierlistItem> = new EventEmitter()

  itemsForm!: FormGroup
  itemName: string = ''
  itemUrl: string = ''
  haveError: string = 'false'

  constructor() { }

  ngOnInit(): void {
    this.itemsForm = new FormGroup({
      name: new FormControl(this.itemName, [Validators.required]),
      url: new FormControl(this.itemUrl)
    })
  }


  onEditItem() {
    const name = this.itemsForm.get('name')?.value
    const url = this.itemsForm.get('url')?.value
    let item = new TierlistItem(url, name);
    this.onSave.emit(item)
  }

  onContentChange() {
    if (this.nameEdited?.errors?.['required']) {
      this.haveError = "true"
    } else
      this.haveError = "false"
  }

  get nameEdited() {
    return this.itemsForm.get('name')?.value
  }

  get urlEdited() {
    return this.itemsForm.get('url')
  }
}
