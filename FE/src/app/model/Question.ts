export interface IQuestion {
    id?: string;
    question?: string;
    correct_answer?: string;
    type?: string;
    points?:number;
    other_choice_answer?:string[];
}
export class Question implements IQuestion {
    id?: string;
    question?: string;
    correct_answer?: string;
    type?: string;
    points?:number;
    other_choice_answer?:string[];
    constructor(data?: IQuestion){
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }

    }

}
