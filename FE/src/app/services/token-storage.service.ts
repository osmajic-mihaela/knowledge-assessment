import { Injectable } from '@angular/core';
import {Usert} from "../model/Usert";
import {User} from "../model/User";
import {BehaviorSubject, Observable} from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public role$: Observable<string> = this.roleSubject.asObservable();
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    this.updateRole('');
    console.log('odjava ',!!window.sessionStorage.getItem(TOKEN_KEY))
  }
  public isLoggedIn():boolean{
    return !!window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveToken(token: string): void {
    console.log(token)
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: User): void {

    // @ts-ignore
      let userTk:Usert = new Usert(user.id,user.role.name);
    console.log(userTk)
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(userTk));
  }
  public getUser(): Usert {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log(user)
      return JSON.parse(user);
    }
    return new Usert("", "");
  }

  private updateRole(role: string): void {
    this.roleSubject.next(role);
  }
}
