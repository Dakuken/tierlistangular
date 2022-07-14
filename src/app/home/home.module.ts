import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule
  ]
})
export class HomeModule { }
