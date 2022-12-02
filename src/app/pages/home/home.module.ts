import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbUserModule } from '@nebular/theme';
import { LoaderModule } from '../../components/loader/loader.module';




@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    NbUserModule,
    LoaderModule
  ]
})
export class HomeModule { }
