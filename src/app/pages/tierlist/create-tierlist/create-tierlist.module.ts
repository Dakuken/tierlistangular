import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbInputModule, NbRadioModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTierlistComponent } from './components/create-tierlist.component';
import { SmartCreateTierlist } from './smart/create-tierlist.smart.component';



@NgModule({
  declarations: [CreateTierlistComponent, SmartCreateTierlist],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbRadioModule,

  ],
})
export class CreateTierlistModule { }
