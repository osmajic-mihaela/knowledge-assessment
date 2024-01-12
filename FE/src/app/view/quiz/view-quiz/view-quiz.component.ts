import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../../../model/Quiz";
import {QuizService} from "../../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentQuiz} from "../../../model/StudentQuiz";

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {
  public quiz:Quiz
  quizId = "m7aeb9ab-5055-4f5b-b32c-0b7f5d6c23b0"
  constructor(private quizService:QuizService,private router:Router,private route: ActivatedRoute) {
    this.quiz = new Quiz()
  }

  ngOnInit(): void {
    this.quizService.getQuizById(this.quizId).subscribe(
        res => {
          console.log(res)
          this.quiz = res

        }
    )
  }

  getQuestionType(id: string | undefined):any
  {
    var temp = false
    this.quiz.questions?.forEach(q =>{
      // @ts-ignore

      // @ts-ignore
      if(q.id == id && q.type.name == 'FREE_ANSWER'){
        temp = true
      }

    })
    console.log(temp)
    return temp

  }

  getQuestionType2(id: string | undefined):any
  {
    var temp = false
    this.quiz.questions?.forEach(q =>{
      // @ts-ignore

      // @ts-ignore
      if(q.id == id && q.type.name != 'FREE_ANSWER'){
        temp = true
      }

    })

    return temp

  }

  backToCalendar() {
    this.router.navigate(['app-teacher-calendar'])
  }
}
