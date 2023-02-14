import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tierlist} from 'src/app/models/tierlist.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, animateChild, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";
import TierlistItem from "../../../../../../models/TierlistItem.model";
import {DeleteTierlistService} from "../../../../../../services/tierlist/delete-tierlist.service";
import {AuthService} from "../../../../../../services/auth/auth.service";
import {ErrorService} from "../../../../../../services/error.service";

@Component({
  selector: 'app-tierlist-bar',
  templateUrl: './tierlist-bar.component.html',
  styleUrls: ['./tierlist-bar.component.scss'],
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
export class TierlistBarComponent implements OnInit {
  @Input() tierlist: Tierlist = {author: ' sdf', description: ' sdf', isPublic: false, items: [], name: ' sdf'}
  @Input() isPublic!: boolean

  @Output() onSave: EventEmitter<any> = new EventEmitter()

  @Output() emitNewItem : EventEmitter<TierlistItem> = new EventEmitter();
  editTitle: boolean = false
  itemName: string = ''
  itemUrl: string = ''

  itemsForm!: FormGroup

  haveError: string = 'false'

  tempTitle = ""

  constructor(private deleteTierlistService: DeleteTierlistService, private authService: AuthService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.itemsForm = new FormGroup({
      name: new FormControl(this.itemName, [Validators.required]),
      url: new FormControl(this.itemUrl)
    })
  }

  onPublic() {
    this.isPublic = !this.isPublic
  }


  get name() {
    return this.itemsForm.get('name')?.value
  }

  get url() {
    return this.itemsForm.get('url')
  }

  toggle() {
    this.isPublic = !this.isPublic;
    this.tierlist.isPublic = this.isPublic
  }


  changeTitle(title: string) {
    this.tempTitle = title;
  }

  changeDescription(description: string) {
    this.tierlist.description = description;
  }


  async onChangeTitle() {
    if (this.editTitle && this.tempTitle && this.tempTitle.length >= 3) {
      console.log('a,nzlomg negijoungi nhjg')
      await this.deleteTierlistService.deleteUserTierlist(`${this.tierlist.name}-${this.authService.getUID()}`).then((res) => {
        this.tierlist.name = this.tempTitle
        this.onSave.emit("true")
        this.editTitle = !this.editTitle
      }).catch(err => {
        this.errorService.inverse(`Désolé il y a eu une erreur, veuillez réssayer ou me contacter. Code erreur : ${err}`,6000)
        return
      })
    }else {
      this.errorService.inverse(`Désolé, il faut un nom du plus de 3 lettres 😉.`,1000)
    }

  }

  onEditTitle(){
    this.editTitle = !this.editTitle
    this.tempTitle = this.tierlist.name
  }
  onAddItem() {
    const name = this.itemsForm.get('name')?.value
    const url = this.itemsForm.get('url')?.value
    let item = new TierlistItem(url, name);
    this.emitNewItem.emit(item)
  }

  onContentChange() {
    if (this.name?.errors?.['required']) {
      this.haveError = "true"
    } else
      this.haveError = "false"
  }
}
