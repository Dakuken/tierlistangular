import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tierlist-item',
  templateUrl: './tierlist-item.component.html',
  styleUrls: ['./tierlist-item.component.scss']
})
export class TierlistItemComponent implements OnInit {
  @Input() name: string = ' '
  @Input() url : string = ' '
  @Input() order : number = 0

  @Input() canDelete = false

  @Output() deleteItemEmit : EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  deleteItem(){
  this.deleteItemEmit.emit("item delete")
  }

}
