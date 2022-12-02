import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { PetitmalinComponent } from './pages/petitmalin/petitmalin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { TierlistComponent } from './pages/tierlist/show-tierlist/components/tierlist.component';
import { CreateTierlistComponent } from './pages/tierlist/create-tierlist/components/create-tierlist.component';

const appRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'tierlist/:id', canActivate: [AuthGuardService], component: TierlistComponent },
  { path: 'CreateTierlList', canActivate: [AuthGuardService], component: CreateTierlistComponent },
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
