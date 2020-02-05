import { DatePipe } from '@angular/common';
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMethodsService {
  date: Date = new Date();
  exam: any = [];
  constructor(private _service: AppService, private _datePipe: DatePipe) { }

  //Does not display subject if student is not approved
  public getStudentExam(studentNumber: string) {
    this.exam = [];
    this._service.readSubjectByUser(studentNumber).subscribe(userSubject => {
      if (userSubject) {
        for (let i = 0; i < Object.keys(userSubject).length; i++) {
          if (userSubject[i].approved) {
            this._service.readSubjectById(userSubject[i].subjectId).subscribe(subject => {
              let sub: any = subject;
              this._service.readCourseById(sub.courseId).subscribe(course => {
                let cou: any = course;
                this._service.readExamByFk(sub.id).subscribe(exam => {
                  let exm: any = exam;
                  if (this._datePipe.transform(exm.date, "yyyy-MM-dd") == this._datePipe.transform(this.date, "yyyy-MM-dd"))
                  this.exam.push({ cn: cou.name, cc: cou.code, sn: sub.name, sc: sub.code, ed: exm.date, s: exm.session, b: exm.building, r: exm.room, rw: exm.row });
                })
              })
            })
          }
        }
      }
    })
    return this.exam;
  }

  // Does display subject if student is not approved
  public getStudentExamAppr(studentNumber: string) {
    this.exam = [];
    this._service.readSubjectByUser(studentNumber).subscribe(userSubject => {
      if (userSubject) {
        for (let i = 0; i < Object.keys(userSubject).length; i++) {
          this._service.readSubjectById(userSubject[i].subjectId).subscribe(subject => {
            let sub: any = subject;
            this._service.readCourseById(sub.courseId).subscribe(course => {
              let cou: any = course;
              this._service.readExamByFk(sub.id).subscribe(exam => {
                let exm: any = exam;
                this.exam.push({ cn: cou.name, cc: cou.code, sn: sub.name, sc: sub.code, ed: exm.date, s: exm.session, b: exm.building, r: exm.room, rw: exm.row, status: userSubject[i].predicate });
              })
            })
          })
        }
      }
    })
    return this.exam;
  }

}
