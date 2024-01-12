import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Quiz} from "../../../../model/Quiz";
import {StudentQuiz} from "../../../../model/StudentQuiz";

@Component({
  selector: 'app-student-done-quiz',
  templateUrl: './student-done-quiz.component.html',
  styleUrls: ['./student-done-quiz.component.css']
})
export class StudentDoneQuizComponent implements OnInit {
  public quiz:Quiz
  @Input() selectedRes: StudentQuiz
  student_answer : string[]

  constructor() {
    this.selectedRes = new StudentQuiz()
    this.quiz = new Quiz()
    this.student_answer = []
  }

  ngOnInit(): void {
  }

  getValueByIndex(index: number) {
    console.log(this.selectedRes)
    // @ts-ignore
    let pm = this.selectedRes.student_answers[index];
    console.log('U PM vise',pm)
    return  pm
  }

  getQuestionType(id: string | undefined):any
  {
    var temp = false
    this.quiz.questions?.forEach(q =>{
      // @ts-ignore
      if(q.id == id && q.type.name == 'FREE_ANSWER'){
        temp = true
      }

    })
    return temp

  }

  getQuestionType2(id: string | undefined):any
  {
    var temp = false
    this.quiz.questions?.forEach(q =>{
      // @ts-ignore
      if(q.id == id && q.type.name != 'FREE_ANSWER'){
        temp = true
      }

    })

    return temp

  }

  getTeahcerComment(i:number){
    // @ts-ignore
    let p = this.selectedRes.teacher_points_and_notes[i]
    return p
  }




}
