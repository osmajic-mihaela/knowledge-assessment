export interface IUser {
    id: string;
    username?: string;
    password?: string;
    surname?: string;
    name?: string;
    role?: string;
}
export class User implements IUser {
    id: string = '';
    username?: string;
    password?: string;
    surname?: string;
    name?: string;
    role?: string;
    constructor(data?: IUser){
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }

    }

}
