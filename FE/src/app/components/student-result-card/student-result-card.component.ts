import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StudentQuiz} from "../../model/StudentQuiz";

@Component({
  selector: 'app-student-result-card',
  templateUrl: './student-result-card.component.html',
  styleUrls: ['./student-result-card.component.css']
})
export class StudentResultCardComponent implements OnInit {
  @Input() result = new StudentQuiz();
  @Output() messageEvent = new EventEmitter<StudentQuiz>();
  numberOfQuestion: number | undefined = 0
  numberOfCorrect = 0
  constructor() { }

  ngOnInit(): void {
  }

  getNumberOfCorrect(){
    this.numberOfQuestion = this.result.teacher_points_and_notes?.length
    this.numberOfCorrect = 0
    this.result.teacher_points_and_notes?.forEach(x =>{
      if (x[0]!= 0){
        this.numberOfCorrect+=1
      }
    })
    return this.numberOfCorrect+"/"+this.numberOfQuestion
  }

  getPercentageOfCorrect(){
    this.numberOfQuestion = this.result.teacher_points_and_notes?.length
    this.numberOfCorrect = 0
    this.result.teacher_points_and_notes?.forEach(x =>{
      if (x[0]!= 0){
        this.numberOfCorrect+=1
      }
    })
    // @ts-ignore
    let percentage = this.numberOfCorrect*100/this.numberOfQuestion
    return percentage
  }

  viewStudentQuizResult() {
    console.log('Poruka poslata')
    this.messageEvent.emit(this.result);
  }


}
