import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PetitmalinComponent } from './petitmalin/petitmalin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { TierlistComponent } from './tierlist/tierlist.component';

const appRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'tierlist/:id', canActivate: [AuthGuardService], component: TierlistComponent },
  { path: 'petitmalin', component: PetitmalinComponent },
  { path: 'auth/signin', canDeactivate: [CanDeactivateGuard], component: SigninComponent },
  { path: 'auth/signup', canDeactivate: [CanDeactivateGuard], component: SignupComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
