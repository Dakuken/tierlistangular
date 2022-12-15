import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tierlist-item',
  templateUrl: './tierlist-item.component.html',
  styleUrls: ['./tierlist-item.component.scss']
})
export class TierlistItemComponent implements OnInit {
  @Input() name: string = ' '
  @Input() url : string = ' '
  @Input() order : number = 0
  constructor() { }

  ngOnInit(): void {
  }

}
