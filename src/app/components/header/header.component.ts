import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getAuth} from '@firebase/auth';
import {NbMenuService} from '@nebular/theme';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth!: boolean
  mobile: boolean = false
  itemsAuth: { title: string, click: () => void }[] = [
    {
      title: 'Home',
      click: () => {
        this.goTo('/home')
      }
    },
    {
      title: 'Tierlist',
      click: () => {
        this.onViewTierlistPerso()
      }
    },
    {
      title: 'Log out',
      click: () => {
        this.onSignOut()
      }
    }
  ]
  itemsNotAuth: { title: string, click: () => void }[] = [
    {
      title: 'Sign In',
      click: () => {
        this.goTo('/auth/signin')
      }
    },
    {
      title: 'Sign up',
      click: () => {
        this.goTo('/auth/signup')
      }
    }
  ]

  showUserSetting = false
  constructor(menu: NbMenuService, private router: Router, private authService: AuthService) {
    menu.onItemClick().subscribe((data) => {
      const item = data.item as any;
      item.click()
    });

  }

  ngOnInit(): void {

    if (window.screen.width <= 500) {
      this.mobile = true;
    }

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
    this.router.navigate([chemin])
  }

  editTierlist() {
    this.router.navigate(['/Edit-Tierlist', this.authService.getUID()])
  }

  onViewTierlistPerso() {
    this.router.navigate(['/tierlist/' + this.authService.getUID()])
  }

  onShowUserSettings(){
    this.showUserSetting = !this.showUserSetting
  }

  isVisible() {
    let visi = (this.showUserSetting)?' visible' : ' hidden'
    return `visibility : ${visi} ;`
  }

}

