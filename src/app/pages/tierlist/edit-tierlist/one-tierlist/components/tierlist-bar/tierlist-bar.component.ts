import {Component, Input, OnInit} from '@angular/core';
import {Tierlist} from 'src/app/interface/tierlist.interface';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, animateChild, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-tierlist-bar',
  templateUrl: './tierlist-bar.component.html',
  styleUrls: ['./tierlist-bar.component.scss'],
  animations: [
    trigger('grow', [
      state('false', style({height : '50px'})),
      state('true', style({height : '70px'})),
      transition('false => true', [
          style({height: '50px'}),
          animate('1s ease', style({height : '70px'})),
        group([query('@errorAnimation', animateChild())])
        ]),
      transition('true => false', [
          style({height: '70px'}),
          animate('1s ease', style({height : '50px'})),
        group([query('@errorAnimation', animateChild())])
        ]),
    ]),

    //? child
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', keyframes([
          style({ opacity: 0 , offset : 0.5}),
          style({ opacity: 1 , offset : 0.7})
        ]))
      ]),
      transition(':leave', [
        animate('0.150s', style({ opacity: 0 }),)
      ]),
    ]),
  ]
})
export class TierlistBarComponent implements OnInit {
  @Input() tierlist: Tierlist = {author: ' sdf', description: ' sdf', isPublic: false, items: [], name: ' sdf'}
  @Input() isPublic!: boolean
  editTitle: boolean = false
  itemName: string = ''
  itemUrl: string = ''

  itemsForm!: FormGroup

  haveError : string = 'false'

  constructor() {
  }

  ngOnInit(): void {
    this.itemsForm = new FormGroup({
      name: new FormControl(this.itemName, [Validators.required]),
      url: new FormControl(this.itemUrl)
    })
  }

  onPublic() {
    this.isPublic = !this.isPublic
    console.log(this.isPublic)
  }


  get name() {
    return this.itemsForm.get('name')
  }

  get url() {
    return this.itemsForm.get('url')
  }

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

  onContentChange(){
    if(this.name?.errors?.['required']){
      this.haveError = "true"
    }else
      this.haveError = "false"
  }
}
