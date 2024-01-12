import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../model/Quiz";
import {Moment} from "moment/moment";
import {StudentQuiz} from "../model/StudentQuiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  apiHost: string = 'http://localhost:5000/quiz';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json' ,
    'Access-Control-Allow-Origin': '*',
  });
  private idNavigate:string = ""

  constructor(private http:HttpClient) { }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiHost + `/create_quiz`,quiz, {headers: this.headers});
  }
  getQuizById(quizId: string): Observable<Quiz> {
    return this.http.get<Quiz>(this.apiHost +`/${quizId}`, {headers: this.headers});
  }

  getQuizzesByTeacher(teacherId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiHost + `/get_all_quizzes`, {headers: this.headers});
  }

  getStudentQuizzesByQuizId(quizId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiHost + `/get_done_quizzes/${quizId}`, {headers: this.headers});
  }

  evaluateQuiz(studentQuiz:StudentQuiz): Observable<StudentQuiz> {
    return this.http.post<StudentQuiz>(this.apiHost + '/evaluate_quiz' , studentQuiz,{headers: this.headers});
  }

  saveCurrentId(idNavigate:string){
    this.idNavigate = idNavigate
  }
  getCurrentId(){
    return this.idNavigate
  }


}
