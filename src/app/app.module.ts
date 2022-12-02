import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// component
import { HeaderComponent } from './components/header/header.component';

//service
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UsersService } from './services/users.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

//nebular module
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbButtonModule, NbDialogModule, NbIconModule, NbContextMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// my module
import { HomeModule } from './pages/home/home.module';
import { AuthModule } from './pages/auth/auth.module';
import { PetitmalinModule } from './pages/petitmalin/petitmalin.module';
import { ProfService } from './services/profService/prof-service.service';
import { GetProfService } from './services/profService/get-prof.service';
import { SaveProfService } from './services/profService/save-prof.service';
import { ShowTierlistModule } from './pages/tierlist/show-tierlist/components/show-tierlist.module';
import { CreateTierlistModule } from './pages/tierlist/create-tierlist/components/create-tierlist.module';





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
    AuthModule,
    ShowTierlistModule,
    HomeModule,
    CreateTierlistModule,

    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbButtonModule,
    NbLayoutModule,
    NbIconModule,
    NbEvaIconsModule

  ],
  providers: [AuthService, AuthGuardService, UsersService, CanDeactivateGuard, ProfService, GetProfService, SaveProfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
