import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { PetitmalinComponent } from './pages/petitmalin/petitmalin.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { CanDeactivateGuard } from './services/auth/can-deactivate-guard.service';
import { TierlistComponent } from './pages/tierlist/show-tierlist/components/tierlist.component';
import { SmartCreateTierlist } from './pages/tierlist/create-tierlist/smart/create-tierlist.smart.component';
import { SmartEditTierlistComponent } from './pages/tierlist/edit-tierlist/one-tierlist/smart/edit-tierlist.smart.component';
import { SmartAllTierlistComponent } from './pages/tierlist/edit-tierlist/all-tierlist/smart/all-tierlist.smart.component';

const appRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'tierlist/:id', canActivate: [AuthGuardService], component: TierlistComponent },
  { path: 'Edit-Tierlist/:userId', canActivate: [AuthGuardService], component: SmartAllTierlistComponent },
  { path: 'Edit-Tierlist/:userId/:tierlistId', canActivate: [AuthGuardService], component: SmartEditTierlistComponent },
  { path: 'CreateTierlList', canActivate: [AuthGuardService], component: SmartCreateTierlist },
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
