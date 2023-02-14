import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalUserComponent} from "./modal-user.component";
import {NbButtonModule, NbCardModule, NbInputModule} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ModalUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule
  ],
  exports: [ModalUserComponent]
})
export class ModalUserModule { }
