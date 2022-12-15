import { Component, OnInit, Input } from '@angular/core';
import { Tierlist } from 'src/app/interface/tierlist.interface';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tierlist-bar',
  templateUrl: './tierlist-bar.component.html',
  styleUrls: ['./tierlist-bar.component.scss']
})
export class TierlistBarComponent implements OnInit {
  @Input() tierlist: Tierlist = { author: ' sdf', description: ' sdf', isPublic: false, items: [], name: ' sdf' }
  @Input() isPublic!: boolean
  editTitle: boolean = false

  itemName : string = ''
  itemUrl : string = ''

  itemsForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.itemsForm = new FormGroup({
      name : new FormControl(this.itemName, [Validators.required]),
      url : new FormControl(this.itemUrl)
    })
  }

  onPublic() {
    this.isPublic = !this.isPublic
    console.log(this.isPublic)
  }

  get name() { return this.itemsForm.get('name')}
  get url() { return this.itemsForm.get('url')}

  toggle() {
    this.isPublic = !this.isPublic;
    console.log(this.isPublic)
  }

  onEditTitle() {
    if (this.editTitle) return
    this.editTitle = !this.editTitle
  }

  onAddItem() {
    const name = this.itemsForm.get('name')?.value
    const url = this.itemsForm.get('url')?.value
    console.log(name, url)
  }
}
