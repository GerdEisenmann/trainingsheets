import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { ToCService } from '../toc.service';
import { Content } from '../model/content';
import { ToC } from '../model/toc';


@Component({
  selector: 'app-table-of-contents',
  imports: [ CommonModule, RouterModule ],  
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.css'
})
export class TableOfContentsComponent implements OnInit {

  public toc: ToC|null = null;    

  constructor(private tocService: ToCService) { }

  async ngOnInit(): Promise<void> {
    this.toc = await this.tocService.loadToC();
  }
}
