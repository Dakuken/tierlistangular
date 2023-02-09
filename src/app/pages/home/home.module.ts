import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbUserModule} from '@nebular/theme';
import { LoaderModule } from '../../components/loader/loader.module';




@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    NbUserModule,
    LoaderModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class HomeModule { }
