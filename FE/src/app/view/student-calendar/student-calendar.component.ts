import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {map} from "rxjs";
import * as moment from "moment/moment";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { addDays, subDays } from 'date-fns';
import {Router} from "@angular/router";
import {Quiz} from "../../model/Quiz";
import {QuizService} from "../../services/quiz.service";
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#0E4C92',
    secondary: '#cbcbd226',
  },
  green: {
    primary: '#0b6623',
    secondary: '#e8fde7',
  },
};
@Component({
  selector: 'app-student-calendar',
  templateUrl: './student-calendar.component.html',
  styleUrls: ['./student-calendar.component.css']
})
export class StudentCalendarComponent implements OnInit {
  teacherId="3218bcde-d0b4-44b3-bf2c-01e068c6f82b"
  studentId="5218bcde-d0b4-44b3-bf2c-01e068c6f82b"
  viewDate: Date;
  quizzes: CalendarEvent<{}>[] = [];
  dayStartHour = 8;
  dayEndHour = 21;
  hourSegmentHeight = 90;
  daysInWeek = 7;
  view: CalendarView = CalendarView.Week;
  viewDateEnd: Date;
  canClick:boolean = false
  canClickExamination:boolean = false

  monthView: boolean = false
  viewButton:string = "MESEČNI PREGLED"
  selectedEvent: CalendarEvent<{ quiz: Quiz }> = {
    title: null as any,
    start: null as any,
    color: { ...colors['blue'] },
    end: null as any,
    meta: null as any,
  };
  public files: any[];



  constructor(private quizService:QuizService,private router:Router,private http:HttpClient) {
    this.viewDate = this.getMonday(new Date());
    this.viewDateEnd = addDays(this.viewDate, 6);
    this.files = [];
  }

  ngOnInit(): void {
    this.getQuizzesForTeacher()
  }


  async handleCurrent(): Promise<void> {
    this.viewDate = this.getMonday(new Date());
    this.viewDateEnd = addDays(this.viewDate, 6);
    await new Promise(resolve => setTimeout(resolve, 100));
    this.paint()
  }

  async handlePrevious(): Promise<void> {
    this.viewDate = subDays(this.viewDate, 7);
    this.viewDateEnd = addDays(this.viewDate, 6);
    await new Promise(resolve => setTimeout(resolve, 100));
    this.paint()
  }

  async handleNext(): Promise<void> {
    this.viewDate = addDays(this.viewDate, 7);
    this.viewDateEnd = addDays(this.viewDate, 6);
    await new Promise(resolve => setTimeout(resolve, 100));
    this.paint()
  }

  monthShow() {
    this.monthView  = !this.monthView;
    switch (this.viewButton){
      case 'MONTH VIEW':
        this.viewButton = 'WEEK VIEW'
        break
      case 'WEEK VIEW':
        this.viewButton = 'MONTH VIEW'
        break
    }
  }

  onEventClick(event: any): void {
    this.canClick = true;
    this.selectedEvent.color = colors['blue'];
    this.selectedEvent = event.event;

    //if(this.selectedEvent.meta?.quiz.status === 'PENDING'){
    //  this.canClickExamination = true
    //}
    this.selectedEvent.color = colors['green'];
  }


  private getQuizzesForTeacher(){
    this.quizService.getQuizzesByTeacher(this.teacherId)
        .pipe(
            map((results: Quiz[]) => {
              return results.map((quiz: Quiz) => {
                return {
                  title: this.createTitle(quiz),
                  start: this.setTime(quiz.schedule_date!,quiz.schedule_time!),
                  end: this.setTime(quiz.schedule_date!,quiz.schedule_end_time!),
                  color: { ...colors['blue'] },
                  meta: {
                    quiz,
                  },
                };
              });
            })
        )
        .subscribe(
            //@ts-ignore
            (response: CalendarEvent<{ appointment: ScheduleAppStaff }>[]) => {
              this.quizzes = response;
              this.paint()
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        );
  }

  createTitle(quiz: Quiz): string {
    // @ts-ignore
    let selectedHours = quiz.schedule_time.slice(11,13)
    // @ts-ignore
    let selectedMinute= quiz.schedule_time.slice(14,16)
    // @ts-ignore
    let selectedHoursEnd = quiz.schedule_end_time.slice(11,13)
    // @ts-ignore
    let selectedMinuteEnd= quiz.schedule_end_time.slice(14,16)
    // @ts-ignore
    let selectedDate = quiz.schedule_date.slice(0,10)
    return (
        'Naslov:'+
        quiz.title +
        '\n'+
        'Datum: '+
        selectedDate+
        '\n' +
        'Vreme početka: '+
        selectedHours+":"+selectedMinute +
        '\n'+
        'Vreme kraja: '+
        selectedHoursEnd+":"+selectedMinuteEnd +
        '\n'
    );
  }
  private setTime(selectedDate:Date ,selectedTime:string){
    let selectedTimeDate = moment(selectedDate)
    let selectedHours:number = Number(selectedTime.slice(11,13))
    let selectedMinute:number = Number(selectedTime.slice(14,16))
    selectedTimeDate.set({hour:selectedHours,minute:selectedMinute})
    return selectedTimeDate.toDate()
  }


  private getMonday(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(date.setDate(diff));
  }

  private paint(){
    let elems = document.querySelectorAll('div.cal-header span')
    let elemsDays = document.querySelectorAll('div.cal-header b')
    console.log(elemsDays)
    let times = document.querySelectorAll('.cal-time')
    for (let i = 0; i < elems.length; i++) {
      const element = elems[i] as HTMLElement
      element.style.color = 'blue';
    }
    for (let i = 0; i < elemsDays.length; i++) {
      const element = elemsDays[i] as HTMLElement
      element.style.color = 'black';
    }
    for (let i = 0; i < times.length; i++) {
      const element = times[i] as HTMLElement
      element.style.color = '#3b4d79';
    }
  }

  takeAQuiz() {
    this.quizService.saveCurrentId(this.selectedEvent.meta?.quiz.id!)
    this.router.navigate(['app-take-a-quiz'])
  }


}
