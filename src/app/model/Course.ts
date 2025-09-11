import { ExerciseDay } from "./ExerciseDay";

export class Course
 {
    id: number;
    shortName: string = "";
    exerciseDays?: ExerciseDay[];

    constructor(id: number, shortName: string, exerciseDays: ExerciseDay[]) {
        this.id = id;
        this.shortName = shortName;
        this.exerciseDays = exerciseDays;
    }
}