import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../model/Quiz";
import {Moment} from "moment/moment";
import {StudentQuiz} from "../model/StudentQuiz";
import {LoginRequest} from "../model/LoginRequest";
import {User} from "../model/User";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiHost: string = 'http://localhost:5000/user';
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Access-Control-Allow-Origin': '*',
    });
    private logged_user:User = new User()

    constructor(private http:HttpClient) { }

    login(user: LoginRequest): Observable<User> {
        return this.http.post<User>(this.apiHost + `/login`,user, {headers: this.headers});
    }

    singout(): Observable<any> {
        return this.http.get<any>(this.apiHost + `/singout`, {headers: this.headers});
    }

    get_logged_user(): Observable<User> {
        return  this.http.get<User>(this.apiHost + `/get_logged_user`, {headers: this.headers});
    }


    saveCurrentLoggedUser(user:User){
        this.logged_user = user
    }
    getCurrentLoggedUser(){
        return this.logged_user
    }


}
