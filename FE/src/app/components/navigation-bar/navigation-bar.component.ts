import {Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {publicNavData} from "./nav-data/public-nav-data";
import {filter} from "rxjs";
import {studentNavData} from "./nav-data/student-nav-data";
import {teacherNavData} from "./nav-data/teacher-nav-data";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {Usert} from "../../model/Usert";
import {TokenStorageService} from "../../services/token-storage.service";

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  logedIn:boolean=true
  publicNavData = publicNavData;
  studentNavData = studentNavData;
  teacherNavData = teacherNavData;
  loggedUser :Usert|undefined
  @Input() userRole : string='';
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  @HostListener('window:resize',['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }


  constructor(private  userService:UserService,private readonly router:Router,private tkStorage: TokenStorageService) {
    // @ts-ignore
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.loggedUser= this.tkStorage.getUser()

      this.logedIn = this.loggedUser.id != "";
    });
  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
      const user = this.tkStorage.getUser();
      console.log(user)
      console.log(user.role);
      this.userRole = user.role!;
      this.tkStorage.role$.subscribe(role => {
          this.userRole = role;
      });
  }

    ngOnChanges(changes: SimpleChanges): void {
        // @ts-ignore
        if (changes.userRole && changes.userRole.currentValue) {
            // @ts-ignore
            this.userRole = changes.userRole.currentValue;
            // Dodajte ovde bilo koji kod koji treba izvršiti kada se promeni uloga
            console.log('PROMENIO')
        }
    }

  clicked(num: number) {
    let list = document.querySelectorAll('.list');
    let j = 0
    while(j<list.length){
      list[j++].className='list';
    }
    list[num].className='list active';

  }

  menuToggle() {
    let navigation = document.querySelector('.navigation');

    if(!this.collapsed){
      this.collapsed = true;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      navigation!.className='navigation active'
    }
    else{
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      navigation!.className='navigation'
    }
  }

  onSignOut() {
    this.userService.singout().subscribe({
      next: response => {
        console.log('IZLOGUJ SE')
        this.userService.saveCurrentLoggedUser(new User())
          this.tkStorage.signOut()
        this.userRole = ''
        this.router.navigate([''])
      }
    })
  }
}
