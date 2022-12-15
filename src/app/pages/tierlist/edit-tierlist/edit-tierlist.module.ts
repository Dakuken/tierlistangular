import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartEditTierlistComponent } from './one-tierlist/smart/edit-tierlist.smart.component';
import { EditTierlistComponent } from './one-tierlist/components/edit-tierlist.component';
import { SmartAllTierlistComponent } from './all-tierlist/smart/all-tierlist.smart.component';
import { AllTierlistComponent } from './all-tierlist/components/all-tierlist.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbToggleModule } from '@nebular/theme';
import { TierlistBarComponent } from './one-tierlist/components/tierlist-bar/tierlist-bar.component';
import {TierlistItemModule} from "../../../components/tierlist-item/tierlist-item.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [SmartAllTierlistComponent, SmartEditTierlistComponent, EditTierlistComponent, AllTierlistComponent, TierlistBarComponent,],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbToggleModule,
    NbInputModule,
    TierlistItemModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditTierlistModule { }
