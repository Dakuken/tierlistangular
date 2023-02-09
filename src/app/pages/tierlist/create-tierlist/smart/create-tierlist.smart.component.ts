import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreateTierlistService } from 'src/app/services/tierlist/create-tierlist.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-tierlist.smart',
  template: `<app-create-tierlist [signUpForm]="signUpForm" [errorMessage]="errorMessage" (onSubmitFormEvent)="onSubmit($event)" ></app-create-tierlist>`,
})
export class SmartCreateTierlist implements OnInit {
  signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder, private createTierlistService: CreateTierlistService, private router: Router, private authService: AuthService,private  titleService : Title) {
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

  onSubmit(ev: { name: string, description: string, private: boolean }) {
    this.errorMessage = ''
    this.createTierlistService.createTierlist(ev).then((msg) => {
      if (msg !== 'ok') {
        this.errorMessage = msg
      } else {
        this.router.navigate([`Edit-Tierlist/${this.authService.getUID()}/${ev.name}-${this.authService.getUID()}`])
      }
    })
  }
}
