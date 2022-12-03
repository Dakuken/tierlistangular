import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-tierlist',
  templateUrl: './create-tierlist.component.html',
  styleUrls: ['./create-tierlist.component.scss']
})
export class CreateTierlistComponent implements OnInit {

  @Input() signUpForm!: FormGroup;
  @Input() errorMessage!: string;

  @Output() onSubmitFormEvent = new EventEmitter<{ name: string, description: string, private: boolean }>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const name = this.signUpForm.get('name')?.value
    //? utilisation de ||= au cas ou c'est null pour avoir quand meme un string
    const description = (<string>this.signUpForm.get('description')!.value) ||= ' '
    const prive = this.signUpForm.get('private')?.value
    this.onSubmitFormEvent.emit({ name, description, private: prive })
  }


}
