import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// component
import { HeaderComponent } from './header/header.component';

//service
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UsersService } from './services/users.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { ListService } from './services/list.service';

//nebular module
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbButtonModule, NbDialogModule, NbIconModule, NbContextMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// my module
import { HomeModule } from './home/home.module';
import { TierlistModule } from './tierlist/tierlist.module';
import { FormModule } from './auth/form.module';
import { PetitmalinModule } from './petitmalin/petitmalin.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    PetitmalinModule,
    FormModule,
    TierlistModule,
    HomeModule,

    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbButtonModule,
    NbLayoutModule,
    NbIconModule,
    NbEvaIconsModule,
  ],
  providers: [AuthService, AuthGuardService, UsersService, CanDeactivateGuard, ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
