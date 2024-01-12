import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../model/Quiz";
import {StudentQuiz} from "../../../model/StudentQuiz";
import {QuizService} from "../../../services/quiz.service";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DateTime} from "luxon";
import {UserService} from "../../../services/user.service";



@Component({
  selector: 'app-take-a-quiz',
  templateUrl: './take-a-quiz.component.html',
  styleUrls: ['./take-a-quiz.component.css']
})
export class TakeAQuizComponent implements OnInit {
    quiz_id = ""
    public quiz:Quiz
    student_quiz: StudentQuiz
    student_answer : string[]
    isEvaluating =false

    constructor(private quizService:QuizService, private  userService:UserService) {
        this.quiz_id = quizService.getCurrentId()
        this.quiz = new Quiz()
        this.student_quiz = new StudentQuiz()
        let currentDate = new Date()
        this.student_quiz.start_time = currentDate.getHours()+":"+currentDate.getMinutes()
        this.student_answer = []
    }

  ngOnInit(): void {
    this.quizService.getQuizById(this.quiz_id).subscribe(
        res => {
          console.log(res)

          this.quiz = res
            this.quiz.questions?.forEach(q =>{
                // @ts-ignore
                if(q.type.name == 'MULTIPLE_CHOICE'){
                    // @ts-ignore
                    q.other_choice_answer?.push(q.correct_answer)
                    // @ts-ignore
                    q.other_choice_answer = this.shuffleArray(q.other_choice_answer)

                }
              this.student_answer?.push("")
            })
          this.student_quiz.quiz = this.quiz
          this.student_quiz.quiz_id = this.quiz.id
            console.log('Nakon dobavljanja testa st kviz',this.student_quiz)


          console.log(this.student_answer)
          this.student_quiz.student_answers = this.student_answer
        }
    )

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

    print() {
      console.log('Studentski odgovori:' ,this.student_answer)
    }
 eva(){
    let currentDate = new Date()
    this.student_quiz.end_time = currentDate.getHours()+":"+currentDate.getMinutes()
    console.log(this.student_quiz)
    console.log(this.student_answer)
    this.student_quiz.id = ""
    this.student_quiz.student_id= this.userService.getCurrentLoggedUser().id
    this.student_quiz.student=this.userService.getCurrentLoggedUser()
    let temp = this.quiz
    console.log("pre",this.student_quiz)

    this.isEvaluating = true

   this.quizService.evaluateQuiz(this.student_quiz).subscribe(
       res => {
         console.log(res)
         this.student_quiz = res
         this.quiz = temp
         console.log("posle",this.student_quiz)
           this.isEvaluating = false
       }
   )
 }

 getStudentAnswer(i:number){
      return this.student_answer[i]
 }

  getTeahcerComment(i:number){
    // @ts-ignore
    let p = this.student_quiz.teacher_points_and_notes[i]
    return p
  }

    shuffleArray(array: any[]): any[] {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

}
