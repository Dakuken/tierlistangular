import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TierlistItemComponent} from "./tierlist-item.component";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbUserModule} from '@nebular/theme';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [TierlistItemComponent],
  imports: [
    CommonModule,
    NbUserModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    ReactiveFormsModule,
    NbButtonModule
  ],
  exports : [TierlistItemComponent]
})
export class TierlistItemModule { }
