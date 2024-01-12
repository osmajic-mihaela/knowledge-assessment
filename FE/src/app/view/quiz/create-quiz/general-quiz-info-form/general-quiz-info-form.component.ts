import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../../../model/Quiz";

@Component({
  selector: 'app-general-quiz-info-form',
  templateUrl: './general-quiz-info-form.component.html',
  styleUrls: ['./general-quiz-info-form.component.css']
})
export class GeneralQuizInfoFormComponent implements OnInit {
  @Input() quiz: Quiz
  constructor() {
    this.quiz = new Quiz()
  }

  ngOnInit(): void {
  }

}
