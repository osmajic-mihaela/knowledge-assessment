import {Question} from "./Question";

export interface IQuiz {
  id?: string;
  title?: string;
  notes?: string;
  subject?: string;
  questions?:Question[];
  max_points?:number;

  teacher_id?:string;
  teacher?:any;
  creation_date?:Date;
  schedule_date?:Date;
  schedule_time?:string;
  schedule_end_time?:string;
  student_groups? : any;
}
export class Quiz implements IQuiz {
    id?: string;
    title?: string;
    notes?: string;
    subject?: string;
    questions?:Question[];
    max_points?:number;

    teacher_id?:string;
    teacher?:any;
    creation_date?:Date;
    schedule_date?:Date;
    schedule_end_time?:string;
    schedule_time?:string;
    student_groups? : any;
  constructor(data?: IQuiz){
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }

  }

}
