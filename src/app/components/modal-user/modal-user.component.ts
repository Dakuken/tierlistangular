import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {ErrorService} from "../../services/error.service";

@Component({
    selector: 'app-modal-user',
    templateUrl: './modal-user.component.html',
    styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit, AfterViewInit {


    userPseudo: string = ' ';
    userEmail: string = ' ';
    haveError: string = 'false';

    isReady: boolean = false;

    userForm!: FormGroup;

    constructor(private userService: UsersService, private errorService: ErrorService, private formBuilder: FormBuilder) {

    }

    async ngOnInit(): Promise<void> {
        this.userForm = this.formBuilder.group({
            pseudo: ["", Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });

        await this.userService.getEmailPseudo().then(e => {
            this.userPseudo = e.pseudo;
            this.userEmail = e.email;
            this.userForm.setValue({
                pseudo: this.userPseudo,
                email: this.userEmail
            });
        }).catch(e => {
            this.errorService.inverse("information de profil non trouvé : " + e.value);
        });
        this.isReady = true;
    }

    ngAfterViewInit() {
    }

    onEditUser() {
        if (!this.isReady) return;
        try {

            let pseudo = this.userForm.get('pseudo')?.value;
            let email = this.userForm.get('email')?.value;
            if (!pseudo) {
                pseudo = this.userPseudo;
            }
            if (!email) {
                email = this.userEmail;
            }
            this.userService.saveUser(pseudo, email).catch(e => {
                this.errorService.inverse("euuuhh désolé : " + e);
            });
            console.log('laa');
            this.userService.modifyChange()
            //TODO change with service user
        } catch (e) {
            console.log(e);
        }
    }

}
