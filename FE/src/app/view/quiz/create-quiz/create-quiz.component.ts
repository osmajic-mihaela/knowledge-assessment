import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../model/Quiz";
import {Router} from "@angular/router";
import {MatStepper} from "@angular/material/stepper";
import {QuizService} from "../../../services/quiz.service";
//import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  public quiz:Quiz
  stepper: MatStepper | undefined;
  constructor(private readonly router:Router,private quizService:QuizService) {
    this.quiz = new Quiz();
  }

  ngOnInit(): void {
  }

  nextToQuestions(stepper:MatStepper){
    this.stepper = stepper
    this.stepper.next()
    console.log(this.quiz)
  }

  nextToFinish(stepper:MatStepper){
    this.stepper = stepper
    this.stepper.next()
    console.log(this.quiz)

    this.quizService.createQuiz(this.quiz).subscribe(
      res => {
        this.router.navigate(['app-teacher-calendar'])
      }
    )
  }

}
