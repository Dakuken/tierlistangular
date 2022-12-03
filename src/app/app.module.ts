import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// component
import { HeaderComponent } from './components/header/header.component';

//service
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UsersService } from './services/users.service';
import { CanDeactivateGuard } from './services/auth/can-deactivate-guard.service';

//nebular module
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbButtonModule, NbDialogModule, NbIconModule, NbContextMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// my module
import { HomeModule } from './pages/home/home.module';
import { AuthModule } from './pages/auth/auth.module';
import { PetitmalinModule } from './pages/petitmalin/petitmalin.module';
import { GetProfService } from './services/profService/get-prof.service';
import { SaveProfService } from './services/profService/save-prof.service';
import { ShowTierlistModule } from './pages/tierlist/show-tierlist/components/show-tierlist.module';
import { CreateTierlistModule } from './pages/tierlist/create-tierlist/create-tierlist.module';
import { FireStoreService } from './services/fire-store.service';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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

    NbThemeModule.forRoot({ name: 'dark' }),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbButtonModule,
    NbLayoutModule,
    NbIconModule,
    NbEvaIconsModule

  ],
  providers: [AuthService, AuthGuardService, UsersService, CanDeactivateGuard, FireStoreService, GetProfService, SaveProfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
