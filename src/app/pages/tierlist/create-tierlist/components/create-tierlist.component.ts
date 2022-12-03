import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-tierlist',
  templateUrl: './create-tierlist.component.html',
  styleUrls: ['./create-tierlist.component.scss']
})
export class CreateTierlistComponent implements OnInit {

  @Input() signUpForm!: FormGroup;
  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const firstName = this.signUpForm.get('firstName')?.value
    const lastName = this.signUpForm.get('lastName')?.value
    const email = this.signUpForm.get('email')?.value
    const password = this.signUpForm.get('password')?.value
  }


}
