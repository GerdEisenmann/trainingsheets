import { Injectable } from '@angular/core';

import { Plan } from '../model/Plan'
import { ExerciseDay } from '../model/ExerciseDay';
import { Sheet } from '../model/Sheet';

import { PLANS, EXERCISEDAYS, SHEETS } from '../model/Mock-Data';

import { BehaviorSubject, expand, Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { ActiveService } from './active-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allPlans: Plan[] = [];  
  private allExerciseDays: ExerciseDay[] = [];
  private allSheets: Sheet[] = [];
  constructor(private messageService: MessageService, private activeService: ActiveService) { }

  fillDataFromMockData() {
    this.putAllPlans(PLANS);
    this.putAllExerciseDays(EXERCISEDAYS);
    this.putAllSheets(SHEETS);
  }

  storeDataToLocalStorage() {
    const sheetsKey = "sheets";
    const exerciseDaysKey = "exerciseDays";
    let storageString;
    // store to storage
    window.localStorage.setItem(sheetsKey, JSON.stringify(this.getAllSheetsNotObserved()));
    window.localStorage.setItem(exerciseDaysKey, JSON.stringify(this.allExerciseDays));
    // read from storage
    storageString = window.localStorage.getItem(sheetsKey);
    if(storageString !== null) {
      var localSheets: Sheet[] = JSON.parse(storageString);
    };
    storageString = window.localStorage.getItem(exerciseDaysKey);
    if(storageString !== null) {
      var localExerciseDays: ExerciseDay[] = JSON.parse(storageString);
    };
  }

  putAllPlans(plans: Plan[]) {
    this.allPlans = plans;
  }

  getAllPlans(): Observable<Plan[]> {
    var plans: Observable<Plan[]>;
    plans = of(this.allPlans);
    return plans;
  }
  
  getAllPlansNotObserved(): Plan[] {
      return this.allPlans;
  }

  getAllExerciseDays(): Observable<ExerciseDay[]> {
    this.messageService.add('DataService: Fetched ExerciseDays from Mock-Data');
    var exerciseDays: Observable<ExerciseDay[]>;
    exerciseDays = of(this.allExerciseDays);
    return exerciseDays;
  }
  
  getAllExerciseDaysNotObserved(): ExerciseDay[] {
    return this.allExerciseDays;
  }

  getExerciseDay(id: number): Observable<ExerciseDay> {
    const exerciseDay = EXERCISEDAYS.find(ex => ex.id === id)!;
    return of(exerciseDay);
  }

  putAllExerciseDays(days: ExerciseDay[]) {
    this.allExerciseDays = days;
  }

  putAllSheets(sheets: Sheet[]) {
    this.allSheets = sheets;
  }

  getAllSheets(): Observable<Sheet[]> {
    var sheets: Observable<Sheet[]>;
    sheets = of(this.allSheets);
    return sheets;
  }
  getAllSheetsNotObserved(): Sheet[] {
    return this.allSheets;
  }
  getSheet(id: number): Sheet {
    const sheet = this.getAllSheetsNotObserved().find(sh => sh.id === id)!;
    return sheet;
  }
  editSheet(selSheet: Sheet) {
    console.log("Save...", this.activeService.currentSheet);
    if(!(selSheet.id===null)) {
      let sheet = this.getSheet(selSheet.id);
      sheet.shortName = selSheet.shortName;
      sheet.htmlBody = selSheet.htmlBody;
      sheet.note = selSheet.note;

    }
  }

  editExperciseDay(editId: number) {
    console.log("Save...", this.activeService.currentDayInCalendar);
    const selExDay = this.activeService.currentDayInCalendar;
    if(!(selExDay===null)) {
      const index = EXERCISEDAYS.findIndex(sh => sh.id === editId);
      (EXERCISEDAYS[index]).date = (selExDay.value as ExerciseDay).date as Date;
    }
  }

  getNextSheetId(): number {
    var highest: number = 0;
    this.allSheets.forEach(sheet => {
      if ((sheet.id != null) && (sheet.id > highest)) { highest = sheet.id };
    });
    return highest + 1;
  }

  getNextExerciseDayId(): number {
    var highest: number = 0;
    this.allExerciseDays.forEach(day => {
      if ((day.id != null) && (day.id > highest)) { highest = day.id };
    });
    return highest + 1;
  }

  getNextPlanId(): number {
    var highest: number = 0;
    this.allPlans.forEach(day => {
      if ((day.id != null) && (day.id > highest)) { highest = day.id };
    });
    return highest + 1;
  }
}

