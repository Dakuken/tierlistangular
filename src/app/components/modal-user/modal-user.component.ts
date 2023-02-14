import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {

  userForm!: FormGroup
  userPseudo: string = ' '
  userEmail: string = ' '
  haveError: string = 'false'

  isReady : boolean = false

  constructor(private userService: UsersService, private errorService: ErrorService) {

  }

  async ngOnInit(): Promise<void> {
    await this.userService.getEmailPseudo().then(e => {
      this.userPseudo = e.pseudo
      this.userEmail = e.email
    }).catch(e => {
      this.errorService.inverse("euuuhh désolé : " + e)
    })
    this.isReady = true
    console.log(this.userEmail, this.userPseudo)
    this.userForm = new FormGroup({
      pseudo: new FormControl(this.userPseudo),
      email: new FormControl(this.userEmail, Validators.email)
    })


  }

  onEditUser() {
    if(!this.isReady) return
    try {

    let pseudo = this.userForm.get('pseudo')?.value
    let email = this.userForm.get('email')?.value
    if(!pseudo){
      pseudo = this.userPseudo
    }
    if(!email){
      email = this.userEmail
    }
    this.userService.saveUser(pseudo,email).catch(e => {
      this.errorService.inverse("euuuhh désolé : " + e)
    })
    //TODO change with service user
    }
    catch (e)  {
      console.log(e)
    }
  }

  get pseudoEdited() {
    if(!this.isReady) return
    return this.userForm.get('pseudo')?.value
  }

  get emailEdited() {
    if(!this.isReady) return
    return this.userForm.get('email')?.value
  }
}
