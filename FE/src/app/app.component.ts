import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import {TokenStorageService} from "./services/token-storage.service";

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'evaluating-students-fe';
  isSideNavCollapsed = false;
  screenWidth = 0;
  userRole: string  = '';
  isLoggedIn = false

  username?: string;
  constructor(private userService:UserService, private tokenStorageService:TokenStorageService) { }

  logout(): void {
    this.userService.singout()
      this.tokenStorageService.signOut();
    window.location.reload();
  }

  onToggleSideNav(data: SideNavToggle): void {
    let user = this.userService.getCurrentLoggedUser();
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      let user1 = this.tokenStorageService.getUser()
    console.log('Ulogovan je ', user, this.isLoggedIn);
    console.log('Papapa je ', user1, this.isLoggedIn);

      if (this.isLoggedIn) {
          const user = this.tokenStorageService.getUser();
          /*this.username = user.user?.username;*/
          // @ts-ignore
          this.userRole = user.userRole!;
      }

    if (user && user.id !== '') {
      this.isLoggedIn = true;


      // @ts-ignore
      if (user.role && user.role.name != null) {
        // @ts-ignore
        this.userRole = user.role.name;
      }
    }

    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }





}
