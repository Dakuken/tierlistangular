import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartEditTierlistComponent } from './one-tierlist/smart/edit-tierlist.smart.component';
import { EditTierlistComponent } from './one-tierlist/components/edit-tierlist.component';
import { SmartAllTierlistComponent } from './all-tierlist/smart/all-tierlist.smart.component';
import { AllTierlistComponent } from './all-tierlist/components/all-tierlist.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbToggleModule } from '@nebular/theme';



@NgModule({
  declarations: [SmartAllTierlistComponent, SmartEditTierlistComponent, EditTierlistComponent, AllTierlistComponent,],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbToggleModule,
    NbInputModule
  ]
})
export class EditTierlistModule { }
