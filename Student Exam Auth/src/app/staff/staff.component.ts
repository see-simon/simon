import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  @Input("studNo") studNo = "";
  date: Date = new Date();
  rows: Object = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ", "KK", "LL", "MM", "NN", "OO", "PP", "QQ", "RR", "SS", "TT", "UU", "VV", "WW", "XX", "YY", "ZZ"];
  headElements = ["Stud. No.", "Name", "Course", "Subject", "Exam Date", "Session", "Building", "Room", "Seat No."];
  exam: Array<Object>;
  err: string;
  first: number = 0;
  second: number = 0;
  total: number = 0;
  constructor(private _service: AppService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this.userExams();
  }

  userExams() {
    this.exam = [];
    let col: number = 1;
    let rowNum: number = 0;
    let row: string = "";
    this._service.readCourse().subscribe(course => {
      this._service.readSubject().subscribe(subject => {
        for (let i = 0; i < Object.keys(course).length; i++) {
          for (let j = 0; j < Object.keys(subject).length; j++) {
            if (subject[j].courseId == course[i].id) {
              this._service.readExam().subscribe(exam => {
                for (let k = 0; k < Object.keys(exam).length; k++) {
                  if (exam[k].subjectId == subject[j].id && this._datePipe.transform(exam[k].date, "yyyy-MM-dd") == this._datePipe.transform(this.date, "yyyy-MM-dd")) {
                    col = 1;
                    row = this.rows[rowNum++];
                    this._service.readUserSubject().subscribe(userSubject => {
                      let usrSubj: any = userSubject;
                      usrSubj.forEach(us => {
                        if (us.subjectId == exam[k].subjectId) {
                          this._service.getUsers().subscribe(user => {
                            let usr: any = user;
                            usr.forEach(u => {
                              if (u.id == us.userId) {
                                this.exam.push({ un: u.id, u: u.name.substr(0, 1) + " " + u.surname, cc: course[i].code, s: subject[j].code + " " + subject[j].name, ed: exam[k].date, es: exam[k].session, eb: exam[k].building, er: exam[k].room, sn: row + col++ });
                                if (exam[k].session == "08H45")
                                  this.first++;
                                else
                                  this.second++;
                                this.total++;
                              }
                            })
                          })
                        }
                      });
                    });
                  }
                }
              });
            }
          }
        }
      });
    });
  }

  search(exam) {
    this.exam = [];
    this.err = "";
    let err: boolean = false;
    if (this.studNo == "") {
      err = true;
      this.err = "Please fill in empty filed!";
      this.userExams();
    } else {
      exam.forEach(e => {
        if (e.un == this.studNo) {
          err = true;
          this.exam.push(e);
        }
      });
    }
    if (!err) {
      this.err = "No exam details for student number: " + this.studNo + "!";
      this.userExams();
    }
  }

  downloadCSV(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/csv' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Staff Exam.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadTXT(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/txt' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Staff Exam.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  downloadDOC(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/doc' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Staff Exam.doc";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  downloadPDF(data: any) {
    var doc = new jsPDF();
    var col = this.headElements;
    var rows = [];
    data.forEach(element => {
      var temp = [element.un, element.u, element.cc, element.s, element.ed, element.es, element.eb, element.er, element.sn];
      rows.push(temp);
    });
    doc.autoTable(col, rows);
    doc.save('Staff Exam.pdf');
  }
}

