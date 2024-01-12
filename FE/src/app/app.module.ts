import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { IonicModule } from "@ionic/angular";
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSelectModule} from "@angular/material/select";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
//import { ToastrModule } from 'ngx-toastr';
//import {NgToastModule} from "ng-angular-popup";
import {MatDividerModule} from "@angular/material/divider";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {MaterialModule} from "./material/material.module";
import {AppRoutingModule} from "./app-routing.module";
import { QuizComponent } from './view/quiz/quiz.component';
import { CreateQuizComponent } from './view/quiz/create-quiz/create-quiz.component';
import { GeneralQuizInfoFormComponent } from './view/quiz/create-quiz/general-quiz-info-form/general-quiz-info-form.component';
import { QuestionQuizFormComponent } from './view/quiz/create-quiz/question-quiz-form/question-quiz-form.component';
import {MatNativeDateModule} from "@angular/material/core";
import { TakeAQuizComponent } from './view/quiz/take-a-quiz/take-a-quiz.component';
import { TeacherCalendarComponent } from './view/teacher-calendar/teacher-calendar.component';
import { ViewQuizComponent } from './view/quiz/view-quiz/view-quiz.component';
import { ViewStudentsResultsComponent } from './view/quiz/view-students-results/view-students-results.component';
import { StudentResultCardComponent } from './components/student-result-card/student-result-card.component';
import { StudentDoneQuizComponent } from './view/quiz/view-students-results/student-done-quiz/student-done-quiz.component';
import { StudentCalendarComponent } from './view/student-calendar/student-calendar.component';
import { LoginComponent } from './view/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NavigationBarComponent,
    QuizComponent,
    CreateQuizComponent,
    GeneralQuizInfoFormComponent,
    QuestionQuizFormComponent,
    TakeAQuizComponent,
    TeacherCalendarComponent,
    ViewQuizComponent,
    ViewStudentsResultsComponent,
    StudentResultCardComponent,
    StudentDoneQuizComponent,
    StudentCalendarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule, // required animations module
    //ToastrModule.forRoot(),
    MatDialogModule,
    //NgToastModule,
    MatDividerModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
      MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
