import { Component, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Sheet } from "../model/Sheet";
import { ExerciseDay } from "../model/ExerciseDay";
import { Course } from "../model/Course";

@Injectable({
    providedIn: 'root' // Singleton
})
export class ActiveService {

    public currentSheet = new BehaviorSubject<Sheet|null>(null);
    public currentDayInCalendar = new BehaviorSubject<ExerciseDay|null>(null);
    public currentDayInCourse = new BehaviorSubject<ExerciseDay|null>(null);
    public currentCourse = new BehaviorSubject<Course|null>(null);
    public isAdmin = false;
    constructor (){};


}