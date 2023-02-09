import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TierlistItemComponent} from "./tierlist-item.component";
import {NbIconModule, NbUserModule} from '@nebular/theme';


@NgModule({
  declarations: [TierlistItemComponent],
  imports: [
    CommonModule,
    NbUserModule,
    NbIconModule
  ],
  exports : [TierlistItemComponent]
})
export class TierlistItemModule { }
