import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbButtonModule, NbCardModule, NbUserModule } from '@nebular/theme';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NbUserModule
  ]
})
export class HomeModule { }
