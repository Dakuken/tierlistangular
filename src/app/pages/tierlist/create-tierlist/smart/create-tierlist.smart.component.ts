import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import {CreateTierlistService} from 'src/app/services/tierlist/create-tierlist.service';
import {Title} from "@angular/platform-browser";
import {ErrorService} from "../../../../services/error.service";

@Component({
  selector: 'app-create-tierlist.smart',
  template: `
    <app-create-tierlist [signUpForm]="signUpForm" [errorMessage]="errorMessage" (onSubmitFormEvent)="onSubmit($event)"></app-create-tierlist>`,
})
export class SmartCreateTierlist implements OnInit {
  signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder, private createTierlistService: CreateTierlistService, private router: Router, private authService: AuthService, private titleService: Title, private errreurService : ErrorService) {
    this.titleService.setTitle('Create Tierlist')
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      private: [, Validators.required,]
    })
  }

  async onSubmit(ev: { name: string, description: string, private: boolean }) {
    this.errorMessage = ''
    await this.createTierlistService.createTierlist(ev).then((res) => {
      if (res === 'ok') {
        console.log('laaa')
        this.router.navigate([`Edit-Tierlist/${this.authService.getUID()}/${ev.name}-${this.authService.getUID()}`])
      }
    }).catch(err => {
      this.errreurService.inverse(err, 4000)
    })
  }
}
