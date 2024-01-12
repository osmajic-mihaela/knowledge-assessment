import {Quiz} from "./Quiz";

export interface IStudentQuiz {
    quiz_id ?:string
    quiz ?:Quiz
    start_time ?:string
    end_time ?:string
    student_answers ?:string[]
    sum_points ?:number
    teacher_points_and_notes ?:any[]
    student_id ?:string
    student ?:any
}
export class StudentQuiz implements IStudentQuiz {
    id?: string;
    quiz_id ?:string
    quiz ?:Quiz
    start_time ?:string
    end_time ?:string
    student_answers ?:string[]
    sum_points ?:number
    teacher_points_and_notes ?:any[]
    student_id ?:string
    student ?:any
    constructor(data?: IStudentQuiz){
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }

    }

}
