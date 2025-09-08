import { Component, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Sheet } from "../model/Sheet";
import { ExerciseDay } from "../model/ExerciseDay";
import { Plan } from "../model/Plan";

@Injectable({
    providedIn: 'root' // Singleton
})
export class ActiveService {

    public currentSheet = new BehaviorSubject<Sheet|null>(null);
    public currentDayInCalendar = new BehaviorSubject<ExerciseDay|null>(null);
    public currentDayInPlan = new BehaviorSubject<ExerciseDay|null>(null);
    public currentPlan = new BehaviorSubject<Plan|null>(null);
    public isAdmin = false;
    constructor (){};


}