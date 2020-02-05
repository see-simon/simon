export class User {
    id?: string;
    name?: string;
    surname?: string;
    email?: string;
    contact?: string;
    role?: string;
    dateOfBirth?: Date;
    // password?: string;
    gender?: string;
    // fingerPrint?: string;
    fingerPrint?: Blob;
    active?: boolean;
    photo?: Blob;
    regDate?: Date;
}
