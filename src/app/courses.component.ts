import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { ActiveService } from "./service/active-service";
import { DataService } from "./service/data.service";
import { FormsModule } from "@angular/forms";
import { ExerciseDay } from "./model/ExerciseDay";
import { Course } from "./model/Course";
import { CommonModule, NgFor } from "@angular/common";
import { EditNameModalComponent } from "./table-of-contents/editNameModal.component";
import { DayQueryModalComponent } from "./table-of-contents/searchDayQueryModal.component";
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatListModule, MatListItem, MatListItemIcon } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'courses',
  templateUrl: './courses.components.html',
  styleUrl: './courses.components.css',
  imports: [FormsModule, CommonModule, NgFor, MatTabsModule, MatListModule, MatIconModule, MatButtonModule, MatCardModule],
  providers: [ { provide: MatDialogRef,useValue: {} } ]
})

export class CourseComponent {

  activeCourse: Course = new Course(0, "", []);
  activeExerciseDay: ExerciseDay = new ExerciseDay;
  courses: Course[] = [];
  days: ExerciseDay[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private httpClient: HttpClient, private activeService: ActiveService, private dataService: DataService) {};

  ngOnInit(): void {
    this.getCourses();
    this.selectFirstCourse()
  }

  selectFirstCourse() {
    let firstCourse = null;
    if(this.courses.length > 0) firstCourse = this.courses[0];
    if(firstCourse != null) {
      this.activeService.currentCourse.next(firstCourse);
      this.activeCourse = firstCourse;
      this.selectCourse(firstCourse);
    }
  }

  clickedAddCourseButton() {
    console.log("Add");
    var course = new Course(this.dataService.getNextCourseId(), "New Course", []);
    this.courses.push(course);
    this.activeService.currentCourse.next(course);
    this.activeCourse = course;
    this.selectCourse(this.activeCourse);
  }

  async clickedEditCourseButton() {
    if(this.activeService.currentCourse.value != null) {
      var selCourse: Course = this.activeService.currentCourse.value as Course;
    } else {
      return
    }

    //Open Search dialog
    const dialogRef = this.dialog.open(EditNameModalComponent, {
      width: '400px'
    });
  
    const resultString = await dialogRef.afterClosed().toPromise() as string;
    console.log(resultString);
    if(resultString === undefined) {
      return undefined
    } else {
      this.activeService.currentCourse.value.shortName = resultString;
      this.sortCourses();
      //this.dataService.editCourse(selExDayId);
      return resultString;
    }
  }

  clickedDeleteCourseButton() {
    if(this.activeCourse === null) return;
    let list = this.courses;
    const index = list.findIndex(x => x.id === this.activeCourse.id);
    list.splice(index, 1);
    this.days = new Array;
  }

  selectCourse(arg: Course): void {
    console.log(arg);
    if(this.activeCourse.exerciseDays !== undefined) {
      this.activeService.currentCourse.next(arg);
      this.activeCourse = arg;
      this.days = this.activeCourse.exerciseDays as ExerciseDay[];
      this.activeExerciseDay = new ExerciseDay();
    }
  }

  getCourses(): Course[] {
    this.dataService.getAllCourses().subscribe(courses => this.courses = courses);
    this.sortCourses();
    return this.courses;
  }

  sortCourses(): void {
    this.courses = this.courses.sort(function(a, b) { return a.shortName.localeCompare(b.shortName)});
  }

  clickedRemoveExerciseDayButton() {
    // Remove from Course
    let selCourse: Course = this.activeService.currentCourse.value as Course;
    let list = selCourse.exerciseDays as ExerciseDay[];
    const index = list.findIndex(x => x.id === this.activeExerciseDay.id);
    selCourse.exerciseDays?.splice(index, 1);
  }
  
  async clickedAddExerciseDayButton() {
    if(this.activeCourse == null) {
      return
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '600px';
    dialogConfig.data = this.dataService.getAllExerciseDaysNotObserved();
    const dialogRef = this.dialog.open(DayQueryModalComponent, dialogConfig);

    const resultDay = await dialogRef.afterClosed().toPromise();
    console.log(resultDay);
    if(resultDay != null) {
      this.activeCourse.exerciseDays?.push(resultDay);
      console.log("...added");
    }
  }

  selectDay(day: ExerciseDay) {
    console.log(day);
    this.activeExerciseDay = day;
    this.activeService.currentDayInCourse.next(day);
  }

}