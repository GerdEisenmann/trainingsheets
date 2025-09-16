import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogActions, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExerciseDay } from '../model/ExerciseDay';

@Component({
    selector: 'app-query-modal',
    templateUrl: './searchDayQueryModal.component.html',
    styleUrl: './searchDayQueryModal.component.css',
    imports: [ MatFormFieldModule, MatInputModule, MatDialogModule, NgFor, CommonModule ],
})

export class DayQueryModalComponent implements OnInit {

    selectedDay: ExerciseDay | null = null;
    dayList: ExerciseDay[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<DayQueryModalComponent>
    ) {
        this.dayList = data;
    }

    ngOnInit(): void {
    }

    onSubmit(day: ExerciseDay) {
        this.dialogRef.close(day);
    }

    search(searchString: string) {
        console.log("todo: search for ", searchString);

    }

    selectDay(arg: ExerciseDay): void {
        console.log("clicked", arg);
        this.selectedDay = arg;
    }

    clickedAddDayButton() {
        if (this.selectedDay != null) {
            console.log("add: ", this.selectedDay);
            this.dialogRef.close(this.selectedDay);
        }
    }

    getDateObject(d: Date): Date {
        if(d == undefined) {
            return new Date;
        } else {}
            return d;
    }

}