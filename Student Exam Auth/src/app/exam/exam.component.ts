import { DatePipe } from '@angular/common';
import { AppService } from './../app.service';
import { Component, OnInit, Input } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  courses: any;
  subjects: any;
  exam: Array<Object> = [];
  exm: boolean = true;
  @Input() exmDate;
  err: string;
  constructor(private _service: AppService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this.exmDate = this._datePipe.transform(new Date(), "yyyy-MM-dd");
    this.getCourses();
    this.getSubjects();
    if (sessionStorage.getItem("exam") != null) {
      this.exm = false;
    }
    else
      this.getExam();
  }

  headElements = ["Course", "Subject", "Exam Date", "Session", "Building", "Room"];

  getCourses() {
    this._service.readCourse().subscribe(res => {
      this.courses = res;
    })
  }

  getSubjects() {
    this._service.readSubject().subscribe(res => {
      this.subjects = res;
    })
  }

  getExam() {
    this.getCourses();
    this.getSubjects();
    this._service.readExam().subscribe(res => {
      let exam = res;
      if (Object.keys(exam).length > 0) {
        this.exm = false;
        for (let i = 0; i < Object.keys(exam).length; i++) {
          for (let k = 0; k < Object.keys(this.courses).length; k++) {
            if (this.courses[k].id == exam[i].courseId) {
              for (let j = 0; j < Object.keys(this.subjects).length; j++) {
                if (this.subjects[j].id == exam[i].subjectId) {
                  this.exam.push({ cCode: this.courses[k].code, cName: this.courses[k].name, sCode: this.subjects[j].code, sName: this.subjects[j].name, date: exam[i].date, session: exam[i].session, building: exam[i].building, room: exam[i].room });
                }
              }
            }
          }
        }
      }
    })
  }

  search(exam) {
    this.exam = [];
    this.err = "";
    let err: boolean = false;

    exam.forEach(e => {
      if (e.date == this.exmDate) {
        err = true;
        this.exam.push(e);
      }
    });

    if (!err) {
      this.err = "No exam details for: " + this.exmDate + "!";
      this.getExam();
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
    a.download = "Exam Timetable.csv";
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
    a.download = "Exam Timetable.txt";
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
    a.download = "Exam Timetable.doc";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  downloadPDF(data: any) {
    var doc = new jsPDF();
    var col = this.headElements;
    var rows = [];
    data.forEach(element => {
      var temp = [element.cCode + " " + element.cName, element.sCode + " " + element.sName, element.date, element.session, element.building, element.room];
      rows.push(temp);
    });
    doc.autoTable(col, rows);
    doc.save('Exam Timetable.pdf');
  }
}
