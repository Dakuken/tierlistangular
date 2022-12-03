import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { NbAlertModule, NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbAlertModule
  ],
  exports: [AlertComponent]
})
export class AlertModule { }
