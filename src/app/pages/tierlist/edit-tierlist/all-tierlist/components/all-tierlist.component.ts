import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tierlist } from 'src/app/interface/tierlist.interface';

@Component({
  selector: 'app-all-tierlist',
  templateUrl: './all-tierlist.component.html',
  styleUrls: ['./all-tierlist.component.scss']
})
export class AllTierlistComponent implements OnInit {
  @Input() tierlists!: Tierlist[]
  @Output() editTierlist = new EventEmitter<Tierlist>()
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(tierlist: Tierlist) {
    this.editTierlist.emit(tierlist)
  }
}
