import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditableTierlistItemComponent} from "./editable-tierlist-item.component";
import {NbButtonModule, NbCardModule, NbInputModule} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [EditableTierlistItemComponent],
  imports: [
    CommonModule,
    NbCardModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule
  ],
  exports : [EditableTierlistItemComponent]
})
export class EditableTierlistItemModule { }
