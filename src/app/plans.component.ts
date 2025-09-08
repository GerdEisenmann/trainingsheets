import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { ActiveService } from "./service/active-service";
import { DataService } from "./service/data.service";
import { FormsModule } from "@angular/forms";
import { ExerciseDay } from "./model/ExerciseDay";
import { Plan } from "./model/Plan";
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
  selector: 'plans',
  templateUrl: './plans.components.html',
  styleUrl: './plans.components.css',
  imports: [FormsModule, CommonModule, NgFor, MatTabsModule, MatListModule, MatIconModule, MatButtonModule, MatCardModule],
  providers: [ { provide: MatDialogRef,useValue: {} } ]
})

export class PlansComponent {

  activePlan: Plan = new Plan(0, "", []);
  activeExerciseDay: ExerciseDay = new ExerciseDay;
  plans: Plan[] = [];
  days: ExerciseDay[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private httpClient: HttpClient, private activeService: ActiveService, private dataService: DataService) {};

  ngOnInit(): void {
    this.getPlans();
    this.selectFirstPlan()
  }

  selectFirstPlan() {
    let firstPlan = null;
    if(this.plans.length > 0) firstPlan = this.plans[0];
    if(firstPlan != null) {
      this.activeService.currentPlan.next(firstPlan);
      this.activePlan = firstPlan;
      this.selectPlan(firstPlan);
    }
  }

  clickedAddPlanButton() {
    console.log("Add");
    var plan = new Plan(this.dataService.getNextPlanId(), "New Plan", []);
    this.plans.push(plan);
    this.activeService.currentPlan.next(plan);
    this.activePlan = plan;
    this.selectPlan(this.activePlan);
  }

  async clickedEditPlanButton() {
    if(this.activeService.currentPlan.value != null) {
      var selPlan: Plan = this.activeService.currentPlan.value as Plan;
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
      this.activeService.currentPlan.value.shortName = resultString;
      this.sortPlans();
      //this.dataService.editPlan(selExDayId);
      return resultString;
    }
  }

  clickedDeletePlanButton() {
    if(this.activePlan === null) return;
    let list = this.plans;
    const index = list.findIndex(x => x.id === this.activePlan.id);
    list.splice(index, 1);
    this.days = new Array;
  }

  selectPlan(arg: Plan): void {
    console.log(arg);
    if(this.activePlan.exerciseDays !== undefined) {
      this.activeService.currentPlan.next(arg);
      this.activePlan = arg;
      this.days = this.activePlan.exerciseDays as ExerciseDay[];
      this.activeExerciseDay = new ExerciseDay();
    }
  }

  getPlans(): Plan[] {
    this.dataService.getAllPlans().subscribe(plans => this.plans = plans);
    this.sortPlans();
    return this.plans;
  }

  sortPlans(): void {
    this.plans = this.plans.sort(function(a, b) { return a.shortName.localeCompare(b.shortName)});
  }

  clickedRemoveExerciseDayButton() {
    // Remove from Plan
    let selPlan: Plan = this.activeService.currentPlan.value as Plan;
    let list = selPlan.exerciseDays as ExerciseDay[];
    const index = list.findIndex(x => x.id === this.activeExerciseDay.id);
    selPlan.exerciseDays?.splice(index, 1);
  }
  
  async clickedAddExerciseDayButton() {
    if(this.activePlan == null) {
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
      this.activePlan.exerciseDays?.push(resultDay);
      console.log("...added");
    }
  }

  selectDay(day: ExerciseDay) {
    console.log(day);
    this.activeExerciseDay = day;
    this.activeService.currentDayInPlan.next(day);
  }

}