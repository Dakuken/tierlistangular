import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { NbMenuService } from '@nebular/theme';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth!: boolean

  constructor(menu: NbMenuService, private router: Router, private authService: AuthService) {
    menu.onItemClick().subscribe((data) => {
      const item = data.item as any;
      if (item.link !== undefined) {
        this.router.navigate([item.link])
      } else if (item.logout !== undefined) {
        item.logout()
      }
    });

  }

  ngOnInit(): void {
    const auth = getAuth();
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false
        }
      }
    )
  }

  onSignOut() {
    this.authService.signOutUser()
    this.router.navigate(['/auth/', 'signin'])
  }

  goTo(chemin: string) {
    console.log(chemin);

    this.router.navigate([chemin])
  }

}

