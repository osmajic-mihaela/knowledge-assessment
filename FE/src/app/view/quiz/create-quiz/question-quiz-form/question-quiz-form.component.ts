import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../../../model/Quiz";
import {Question} from "../../../../model/Question";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-question-quiz-form',
  templateUrl: './question-quiz-form.component.html',
  styleUrls: ['./question-quiz-form.component.css']
})
export class QuestionQuizFormComponent implements OnInit {
  @Input() quiz: Quiz
  question:Question
  temp : Question[]
  wrong_answer1 =""
  wrong_answer2 =""
  wrong_answer3 =""

  constructor(private fb: FormBuilder) {
    this.quiz = new Quiz()
    this.question = new Question()
    this.temp = []
  }
  ngOnInit(): void {

  }

  addQuestion(){
    this.question.other_choice_answer = [this.wrong_answer1,this.wrong_answer2,this.wrong_answer3]
    this.temp.push(this.question)
    this.quiz.questions = this.temp

    this.question.question = ""
    this.question.correct_answer = ""
    this.question.points = 0
    this.question.other_choice_answer = []
    this.wrong_answer3 =""
    this.wrong_answer2 =""
    this.wrong_answer1 =""
    console.log(this.quiz)

  }

}
