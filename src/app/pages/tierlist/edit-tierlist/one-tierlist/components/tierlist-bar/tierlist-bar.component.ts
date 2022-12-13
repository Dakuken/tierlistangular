import { Component, OnInit, Input } from '@angular/core';
import { Tierlist } from 'src/app/interface/tierlist.interface';

@Component({
  selector: 'app-tierlist-bar',
  templateUrl: './tierlist-bar.component.html',
  styleUrls: ['./tierlist-bar.component.scss']
})
export class TierlistBarComponent implements OnInit {

  @Input() tierlist: Tierlist = { author: ' sdf', description: ' sdfs', isPublic: false, items: [], name: ' sdfds' }
  @Input() isPublic: boolean = false
  editTitle: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  onPublic() {
    this.isPublic = !this.isPublic
  }

  onEditTitle() {
    if (this.editTitle) return
    this.editTitle = !this.editTitle
  }

  onAddItem(wsh: any) {
    console.log(wsh);

  }
}
