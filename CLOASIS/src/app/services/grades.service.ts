import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Registration } from '../models/registration.model';
import { Student } from '../models/student.model';
import { Grades } from '../models/grades.model';
import { CGD } from '../models/courseGradeDistribution.model';
import { Subject } from 'rxjs';
import { CourseService } from './course.service';
import { HttpClient } from '@angular/common/http';
import { StudentGrade } from '../models/student-grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  selectedStudentGradesEmmitter = new Subject<number[]>();
  cgdEmitter = new Subject<CGD[]>();
  ExamType: String;

  grades: Grades[] = [
    {id: 1,studentId: "201904057",crn: "202020",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 2,studentId: "201904058",crn: "202020",assignment1:70,assignment2:60,midterm:50,final:95},
    {id: 3,studentId: "201904059",crn: "202020",assignment1:70,assignment2:50,midterm:80,final:35},
    {id: 4,studentId: "201904060",crn: "202020",assignment1:90,assignment2:90,midterm:100,final:75},
    {id: 5,studentId: "201904061",crn: "202020",assignment1:85,assignment2:80,midterm:75,final:95},
    {id: 6,studentId: "201904062",crn: "202020",assignment1:84,assignment2:100,midterm:60,final:25},
    {id: 8,studentId: "201904064",crn: "202020",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 9,studentId: "201904065",crn: "202020",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 10,studentId: "201904066",crn: "202020",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 11,studentId: "201904067",crn: "202020",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 12,studentId: "201904060",crn: "202021",assignment1:90,assignment2:90,midterm:100,final:75},
    {id: 13,studentId: "201904061",crn: "202021",assignment1:85,assignment2:80,midterm:75,final:95},
    {id: 14,studentId: "201904062",crn: "202021",assignment1:84,assignment2:100,midterm:60,final:25},
    {id: 15,studentId: "201904063",crn: "202020",assignment1:80,assignment2:90,midterm:90,final:45},
    {id: 16,studentId: "201904064",crn: "202022",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 17,studentId: "201904065",crn: "202022",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 18,studentId: "201904066",crn: "202023",assignment1:80,assignment2:90,midterm:70,final:85},
    {id: 19,studentId: "201904067",crn: "202023",assignment1:80,assignment2:90,midterm:70,final:85}
  ];

  CGDs: CGD[] = [
    {crn:"202020",assignment1:15,assignment2:15,midterm:30,final:40,overall:100},
    {crn:"202021",assignment1:10,assignment2:10,midterm:25,final:55,overall:100},
    {crn:"202022",assignment1:15,assignment2:25,midterm:30,final:30,overall:100},
    {crn:"202023",assignment1:10,assignment2:25,midterm:25,final:40,overall:100}
  ];

  getStudentGradesInClass(id:string,crn:string,b:number = 0){
    this.http.get('https://cloasisapi.azurewebsites.net/Grade/GetGradesOfStudentInClass/'+id+'/'+crn).subscribe( grd => {   
      for(let key in grd){
        b++;
      }
      if(b>0){
        this.selectedStudentGradesEmmitter.next([grd[0]["GRADE"],grd[1]["GRADE"],grd[2]["GRADE"],grd[3]["GRADE"]]);
      }
      else{
        this.selectedStudentGradesEmmitter.next([0,0,0,0]);
      }
    });
  }

  student_grades: StudentGrade[]=[
    {grade_id:"1",student_id:"202003295",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"201807968",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"201902208",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"201805656",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"201602291",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"201902619",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"202003884",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"201607194",grade:100,description:"Final Exam"},
    {grade_id:"1",student_id:"202003295",grade:50,description:"Midterm Exam"},
    {grade_id:"1",student_id:"201807968",grade:50,description:"Midterm Exam"},
    {grade_id:"1",student_id:"201902208",grade:50,description:"Midterm Exam"},
    {grade_id:"1",student_id:"201805656",grade:50,description:"Midterm Exam"},
    {grade_id:"1",student_id:"201602291",grade:50,description:"Midterm Exam"},
    {grade_id:"1",student_id:"201902619",grade:50,description:"Midterm Exam"},
    {grade_id:"1",student_id:"202003884",grade:50,description:"Midterm Exam"},
    {grade_id:"1",student_id:"201607194",grade:50,description:"Midterm Exam"}
  ];

  get_student_grades(){
    var grades: StudentGrade[]=[];
    this.student_grades.forEach((grade,i:number)=>{
      if (grade.description===this.ExamType){
        grades.push(grade);
      }
    })

    return grades
  }

  selectChartGrades(id:string,crn:string,g: number[] = []){
    this.grades.forEach( grade => {
      if(grade.studentId === id && grade.crn === crn) {
        g = [grade.assignment1,grade.assignment2,grade.midterm,grade.final];
      }
    });
    this.selectedStudentGradesEmmitter.next(g);
  }

  getCGD(crn:string,cgd:CGD = {crn:"",assignment1:-1,assignment2:-1,midterm:-1,final:-1,overall:-1}){
    this.CGDs.forEach(c => {
      if(crn === c.crn){
        cgd = c;
      }
    })
    return cgd;
  }

  getGrades(crn:string,id:string,grades:Grades = {id:-1,crn:"",studentId:"",assignment1:-1,assignment2:-1,midterm:-1,final:-1}){
    this.grades.forEach(gr =>{
        if(gr.crn === crn && gr.studentId === id){
          grades = gr;
        }
      }
    );
    return grades;
  }

  getAverage(grades:Grades,cgd:CGD,k = Object.getOwnPropertyNames(cgd),x: number = 0){
    k.forEach((gr, index)=>{
      if(index !== 0 && index !== k.length-1) {
        x = x + cgd[gr] * grades[gr];
      }
    });
    return x/cgd.overall ;
  }

  getGeneralAverage(crn: string, x:number = 0 , counter:number = 0,cgd:CGD = this.getCGD(crn)){
    this.courseService.registrations.forEach(reg => {
      if(reg.crn === crn){
        counter++;
        x = x + this.getAverage(this.getGrades(crn,reg.studentid),cgd);
      }
    });
    return x/counter;
  }

  getStandardDev(crn:string,avg:number = this.getGeneralAverage(crn),x:number = 0,cgd:CGD = this.getCGD(crn) ){
    this.courseService.registrations.forEach(reg => {
      if(reg.crn === crn){
        x = x + Math.pow(this.getAverage(this.getGrades(crn,reg.studentid),cgd) - avg,2)
      }
    });
    return Math.sqrt(x/this.courseService.getNoOfStudents(crn));
  }

  getTopStudent(crn:string,top:Student = {studentid: "",name: "",email:"",teaM_ID: "",phone:"",dob:"",gender:""},topAvg:number = 0,cgd:CGD = this.getCGD(crn),a:number = 0){
    this.courseService.registrations.forEach(reg => {
      if(reg.crn === crn){
        a=this.getAverage(this.getGrades(crn,reg.studentid),cgd)
        if( a > topAvg) {
          topAvg = a;
          top = this.courseService.getStudent(reg.studentid); 
        }
      }
    });
    return [top,+topAvg.toPrecision(5)];
  }

  getPieChart(crn:string,cgd:CGD = this.getCGD(crn),cgds:string[] = [],cgdn:number[] = []){
  Object.getOwnPropertyNames(cgd).forEach((name,index) => {
    if(index !== 0 && index !== 5){
      cgds.push(name);
      cgdn.push(cgd[name]);
    }
    });
    return [cgds,cgdn];
  }

  constructor(private courseService:CourseService,private http: HttpClient) { }
}
