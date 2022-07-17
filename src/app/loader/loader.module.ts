import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    NbSpinnerModule,
    NbCardModule
  ],
  exports: [LoaderComponent]
})
export class LoaderModule { }
