import { DatePipe } from '@angular/common';
import { AppService } from './../../app.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ExamDate } from 'src/app/class/exam-date';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {
  date: string = "";
  semester: string = "Semester 1";
  today: Date = new Date();
  subject = new Array;
  constructor(private _service: AppService, private _datePipe: DatePipe, private _router: Router) { }

  ngOnInit() {
    this.date = this._datePipe.transform(this.today, "yyyy-MM-dd");
    if (this.today.getMonth() > 6) {
      this.semester = "Semester 2";
    }

    this._service.readCourse().subscribe(courses => {
      for (let i = 0; i < Object.keys(courses).length; i++) {
        let subj: number = 0;
        this._service.readSubject().subscribe(subjects => {
          for (let j = 0; j < Object.keys(subjects).length; j++) {
            if (courses[i].id == subjects[j].courseId) {
              this.subject.push({ courseId: courses[i].id, subjectId: subjects[j].id });
            }
          }
        })
      }
    })
  }

  examDate = new FormGroup({
    startDate: new FormControl,
  })

  save() {
    let examDate: ExamDate = {
      row: 26,
      seats: 520,
      days: 20,
      startDate: new Date(this.examDate.controls["startDate"].value),
      semester: this.semester,
    }

    let exm = this.examTT(this.subject);
    let exam = new Array;
    let x = 0;
    let y = 20;
    let z = 20;
    for (let i = 0; i < 5; i++) {
      examDate.startDate = new Date(this.examDate.controls["startDate"].value)
      do {
        if (examDate.startDate.getDay() < 6 && examDate.startDate.getDay() > 0) {
          if (exm[x])
            if (x % 2 == 0)
              exam.push({ courseId: exm[x].courseId, subjectId: exm[x].subjectId, session: "08H45", building: "SOSH SOUTH: Building 2", room: "2-G13", semester: this.semester, date: this._datePipe.transform(examDate.startDate, "yyyy-MM-dd") });
            else
              exam.push({ courseId: exm[x].courseId, subjectId: exm[x].subjectId, session: "13H45", building: "SOSH SOUTH: Building 2", room: "2-G13", semester: this.semester, date: this._datePipe.transform(examDate.startDate, "yyyy-MM-dd") });
          x++;
          if (x == z) {
            y += 20;
          }
        }
        examDate.startDate.setDate(examDate.startDate.getDate() + 1);
      } while (z == y);
      if (y > 100) {
        break;
      } else {
        z = y;
      }
    }

    for (let i = 0; i < exam.length; i++) {
      this._service.createExam(exam[i]).subscribe(res => {

      })
    }
    this._router.navigate(["/staff"]).then(res => {
      this._router.navigate(["/exam"])
    })
    alert("Timetable created please press F5 to refesh!");
  }

  examTT(subject) {
    let exam = new Array;
    for (let i = 0; i < 100; i += 4) {
      exam.push(subject[i]);
    }

    for (let i = 1; i < 100; i += 4) {
      exam.push(subject[i]);
    }

    for (let i = 2; i < 100; i += 4) {
      exam.push(subject[i]);
    }

    for (let i = 3; i < 100; i += 4) {
      exam.push(subject[i]);
    }

    return exam;
  }
}
