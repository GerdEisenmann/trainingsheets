import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-query-modal',
    imports: [ MatDialogActions, MatDialogContent, MatInputModule, MatNativeDateModule, MatDialogModule, FormsModule ],
    templateUrl: './editNameModal.component.html',
    styleUrls: ['./editNameModal.component.css'],
    providers: []
})

export class EditNameModalComponent {
  editName: string = "";

  constructor(
    private dialogRef: MatDialogRef<EditNameModalComponent>
  ) { }

  //readonly dialog = inject(MatDialog);
  onSubmit(queryName?: string) {
    console.log("Submit: ", queryName);
    this.dialogRef.close(queryName);
  }
}