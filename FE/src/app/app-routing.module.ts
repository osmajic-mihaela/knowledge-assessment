import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {CreateQuizComponent} from "./view/quiz/create-quiz/create-quiz.component";
import {TakeAQuizComponent} from "./view/quiz/take-a-quiz/take-a-quiz.component";
import {TeacherCalendarComponent} from "./view/teacher-calendar/teacher-calendar.component";
import {ViewQuizComponent} from "./view/quiz/view-quiz/view-quiz.component";
import {ViewStudentsResultsComponent} from "./view/quiz/view-students-results/view-students-results.component";
import {StudentCalendarComponent} from "./view/student-calendar/student-calendar.component";
import {LoginComponent} from "./view/login/login.component";



const routes: Routes = [
  { path:'app-take-a-quiz',component:TakeAQuizComponent},
  { path:'app-create-quiz',component:CreateQuizComponent},
  { path:'app-teacher-calendar',component:TeacherCalendarComponent},
  { path:'app-student-calendar',component:StudentCalendarComponent},
  { path:'app-view-quiz',component:ViewQuizComponent},
  { path:'app-view-students-results',component:ViewStudentsResultsComponent},
  { path:'app-login',component:LoginComponent},
  { path:'',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
