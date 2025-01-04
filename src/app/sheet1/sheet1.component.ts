import { Component, OnInit } from '@angular/core';
import { SheetNavigationComponent } from '../sheet-navigation/sheet-navigation.component';
import { NoteComponent } from '../note/note.component';
import { NoteService } from '../note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet1',
  imports: [ CommonModule, SheetNavigationComponent, NoteComponent ],
  templateUrl: './sheet1.component.html',
  styleUrl: './sheet1.component.css'
})
export class Sheet1Component {



}
