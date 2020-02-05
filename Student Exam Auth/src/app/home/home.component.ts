import { DatePipe } from '@angular/common';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rows: Object = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ", "KK", "LL", "MM", "NN", "OO", "PP", "QQ", "RR", "SS", "TT", "UU", "VV", "WW", "XX", "YY", "ZZ"];
  exam: any = [];
  date: Date = new Date();
  print: any;
  constructor(private _service: AppService, private _datePipe: DatePipe, private _router: Router, private _route: ActivatedRoute) {
    _service.removeFirebaseSignUp();
  }

  ngOnInit() {
    this.getExam();
    if (this._service.getUserSession()) {
      this._router.navigate(["/" + this._service.getUserSession().role.toLowerCase()]);
    }

    this._service.listFirebaseSignUp().valueChanges().subscribe(res => {
      let print: any = res[0];
      if (res.length > 0) {
        this._service.getUser(print).subscribe(res => {
          let user: any = res;
          if (user && user.active) {
            this._router.navigate([user.role.toLowerCase()]);
            this._service.setUserSession(res);
          } else {
            this._router.navigate(["home"]);
          }
        });
        console.log(print)
      }
    })
  }

  headElements = ['Cource code', 'Subject name', 'Subject Code', 'Session', 'Building', 'Room', 'Row'];

  getExam() {
    let row: number = 0;
    this._service.readCourse().subscribe(course => {
      this._service.readSubject().subscribe(subject => {
        for (let i = 0; i < Object.keys(course).length; i++) {
          for (let j = 0; j < Object.keys(subject).length; j++) {
            if (subject[j].courseId == course[i].id) {
              this._service.readExam().subscribe(exam => {
                for (let k = 0; k < Object.keys(exam).length; k++) {
                  if (exam[k].subjectId == subject[j].id && this._datePipe.transform(exam[k].date, "yyyy-MM-dd") == this._datePipe.transform(this.date, "yyyy-MM-dd")) {
                    this.exam.push({ cc: course[i].code, sn: subject[j].name, sc: subject[j].code, ed: exam[k].date, s: exam[k].session, b: exam[k].building, r: exam[k].room, rw: this.rows[row++] });
                  }
                }
              });
            }
          }
        }
      });
    });
  }
}