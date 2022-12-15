import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TierlistItemComponent} from "./tierlist-item.component";
import { NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [TierlistItemComponent],
  imports: [
    CommonModule,
    NbUserModule
  ],
  exports : [TierlistItemComponent]
})
export class TierlistItemModule { }
