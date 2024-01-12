import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentQuiz} from "../../../model/StudentQuiz";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-view-students-results',
  templateUrl: './view-students-results.component.html',
  styleUrls: ['./view-students-results.component.css']
})
export class ViewStudentsResultsComponent implements OnInit {
  student_results: StudentQuiz[] = [];
  selectedRes = new StudentQuiz()
    proba = new StudentQuiz()



    constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getAllQuizResults(this.quizService.getCurrentId())
  }

  private getAllQuizResults(quizId:string){
    this.quizService.getStudentQuizzesByQuizId(quizId).subscribe(
        (response) => {
          this.student_results = response;
          console.log('Rezultati studenata',this.student_results)
        }
    )
  }

    receiveMessage(res: StudentQuiz) {
      console.log('Poruka primljena',res)
        this.selectedRes = res;
      this.proba = res
    }

}
