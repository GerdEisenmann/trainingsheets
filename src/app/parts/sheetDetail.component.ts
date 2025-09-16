import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { ActiveService } from "./service/active-service";
import { DataService } from "./service/data.service";
import { FormsModule } from "@angular/forms";
import { Sheet } from "./model/Sheet";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'sheetDetail',
  templateUrl: './sheetDetail.components.html',
  styleUrl: './sheetDetail.components.css',
  imports: [FormsModule, CommonModule],
})

export class SheetDetailComponent {

  @Input()  
  set sheet(newSheet: Sheet) {
    const x = JSON.stringify(newSheet);
    this._sheet = JSON.parse(JSON.stringify(newSheet));
  }

  get sheet() {
    return this._sheet;
  }

  _sheet: Sheet = new Sheet();

  constructor(private httpClient: HttpClient, private activeService: ActiveService, private dataService: DataService) {};

  ngOnInit(): void {
  }

  clickedSaveSheetButton() {
    if (this.sheet != null) {
      console.log("Save: ", this.sheet);
      this.dataService.editSheet(this.sheet);
    }
  }

  get isAdmin() {
    return this.activeService.isAdmin;
  }

  get noteIsNotEmpty() {
    return this.sheet.note != null;
  }
}