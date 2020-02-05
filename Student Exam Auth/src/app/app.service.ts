import { ExamDate } from './class/exam-date';
import { Course } from './class/course';
import { User } from './class/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Exams } from './class/exams';
import { HttpClient } from '@angular/common/http';
import { Subject } from './class/subject';
import { Usersubject } from './class/usersubject';
import { UserCourse } from './class/user-course';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _user: string = "http://192.168.10.66:81/user/";
  private _print: string = "http://192.168.10.66:81/print/";
  private _exam: string = "http://192.168.10.66:81/exam/";
  private _course: string = "http://192.168.10.66:81/course/";
  private _subject: string = "http://192.168.10.66:81/subject/";
  private _userSubject: string = "http://192.168.10.66:81/usersubject/";
  private _userCourse: string = "http://192.168.10.66:81/userCourse/";

  constructor(private _router: Router, private _http: HttpClient, private _firebase: AngularFireDatabase) { }
  //User
  createUser(user: User) {
    return this._http.post(this._user, user);
  }

  getUser(finger: Blob) {
    return this._http.get(this._user + "finger/" + finger);
  }

  readUser(uId: string) {
    return this._http.get(this._user + uId);
  }

  getUsers() {
    return this._http.get(this._user);
  }
  updateUser(user: User) {
    return this._http.put(this._user, user);
  }

  deleteUser(user: User) {
    return this._http.delete(this._user + user.id);
  }

  deleteUsers() {
    return this._http.delete(this._user);
  }

  setUserSession(user: User) {
    return sessionStorage.setItem("user", JSON.stringify(user));
  }

  getUserSession() {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  removeUserSession() {
    return sessionStorage.clear();
  }

  //Exam
  createExam(exam: Exams) {
    return this._http.post(this._exam, exam);
  }

  readExam() {
    return this._http.get(this._exam);
  }

  readExamByFk(fk: number) {
    return this._http.get(this._exam + "fk/" + fk);
  }

  readExamById(id: number) {
    return this._http.get(this._exam + id);
  }

  updateExam(exam: Exams) {
    return this._http.put(this._exam, exam);
  }

  deleteExam(exam: Exams) {
    return this._http.delete(this._exam + exam.id);
  }

  deleteExams() {
    return this._http.delete(this._exam);
  }
  //Course
  createCourse(course: Course) {
    return this._http.post(this._course, course);
  }

  readCourse() {
    return this._http.get(this._course);
  }

  readCourseById(id: number) {
    return this._http.get(this._course + id);
  }

  updateCourse(course: Course) {
    return this._http.put(this._course, course);
  }

  deleteCourse(course: Course) {
    return this._http.delete(this._course + course.id);
  }

  //Subject
  createSubject(subject: Subject) {
    return this._http.post(this._subject, subject);
  }

  readSubject() {
    return this._http.get(this._subject);
  }

  readSubjectById(id: number) {
    return this._http.get(this._subject + id);
  }

  readSubjectByCourse(cid: number) {
    return this._http.get(this._subject + "fk/" + cid);
  }

  updateSubject(subject: Subject) {
    return this._http.put(this._subject, subject);
  }

  deleteSubject(subject: Subject) {
    return this._http.delete(this._subject + subject.id);
  }

  //userSubject
  createUserSubject(userSubject: Usersubject) {
    return this._http.post(this._userSubject, userSubject);
  }

  readUserSubject() {
    return this._http.get(this._userSubject);
  }

  readUserBySubject(sid: number) {
    return this._http.get(this._userSubject + "subject/" + sid);
  }

  readSubjectByUser(uid: string) {
    return this._http.get(this._userSubject + "user/" + uid);
  }

  updateUserSubject(userSubject: Usersubject) {
    return this._http.put(this._userSubject, userSubject);
  }

  deleteUserSubject(userSubject: Usersubject) {
    return this._http.delete(this._userSubject + userSubject.id);
  }

  //userCourse
  createUserCourse(userCourse: UserCourse) {
    return this._http.post(this._userCourse, userCourse);
  }

  readUserCourse() {
    return this._http.get(this._userCourse);
  }

  readUserByCourse(sid: number) {
    return this._http.get(this._userCourse + "course/" + sid);
  }

  readCourseByUser(uid: string) {
    return this._http.get(this._userCourse + "user/" + uid);
  }

  updateUserCourse(userCourse: UserCourse) {
    return this._http.put(this._userCourse, userCourse);
  }

  deleteUserCourse(userCourse: UserCourse) {
    return this._http.delete(this._userCourse + userCourse.id);
  }

  //Ip Address
  getIpAddress() {
    this._http.get("https://api.ipify.org/?format=json").subscribe(res => {
      let ip: any = res;
    })
  }

  //Register and Login Finger prints
  removeFirebaseSignUp() {
    return this._firebase.list("Signup").remove();
  }

  listFirebaseSignUp() {
    return this._firebase.list("Signup");
  }
}