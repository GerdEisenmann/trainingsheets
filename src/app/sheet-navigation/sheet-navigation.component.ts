import { Component, Input, OnInit, Type } from '@angular/core';
import { routes } from '../app.routes';
import { Resolve, ResolveFn, Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Content } from '../model/content';
import { ToCService } from '../toc.service';

@Component({
  selector: 'app-sheet-navigation',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './sheet-navigation.component.html',
  styleUrl: './sheet-navigation.component.css'
})
export class SheetNavigationComponent  {


  public _content: Content|null = null;
  public previousContent: Content|null = null;
  public nextContent: Content|null = null;

  constructor(private tocService: ToCService) {

  }

  @Input()
  public set content(content: Content|null) {
    this._content = content;
    if(this._content) {
      this.getNextAndPreviousContent();
    }
  }

  async getNextAndPreviousContent(): Promise<void> {
    this.previousContent = await this.tocService.getPreviousContent(
      this._content?.uid||null
    )
    this.nextContent = await this.tocService.getNextContent(
      this._content?.uid||null
    );
  }

}
