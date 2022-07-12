import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbContextMenuModule, NbActionsModule, NbMenuModule, NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UsersService } from './services/users.service';
import { ListElementService } from './services/list-element.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';


const appRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'auth/signin', canDeactivate: [CanDeactivateGuard], component: SigninComponent },
  { path: 'auth/signup', canDeactivate: [CanDeactivateGuard], component: SignupComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
]


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NbInputModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    NbIconModule
  ],
  providers: [AuthService, AuthGuardService, UsersService, ListElementService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
