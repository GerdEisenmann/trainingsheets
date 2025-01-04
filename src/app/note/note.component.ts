import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-note',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {

  @Input()
  public key: string | null = null;

  private _note: string | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this._note = this.key ? this.noteService.get(this.key) : null;
  }

  get note(): string|null{
    return this._note
  }

  set note(n: string) {
    this._note = n;
    if(this.key) {
      this.noteService.save(this.key, this._note);
    }
  }

}
