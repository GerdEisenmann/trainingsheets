import { Component } from '@angular/core';
import { Sheet1Component } from '../sheet1/sheet1.component';
import { SheetNavigationComponent } from '../sheet-navigation/sheet-navigation.component';
import { CommonModule } from '@angular/common';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-sheet2',
  imports: [ CommonModule, SheetNavigationComponent, NoteComponent ],
    templateUrl: './sheet2.component.html',
  styleUrl: './sheet2.component.css'
})
export class Sheet2Component {

}
