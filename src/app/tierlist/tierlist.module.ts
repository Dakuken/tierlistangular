import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TierlistComponent } from './tierlist.component';
import { NbUserModule } from '@nebular/theme';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [
    TierlistComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    NbUserModule,
    LoaderModule,

  ]
})
export class TierlistModule { }
