import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-table-of-contents',
  imports: [ CommonModule, RouterModule ],  
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.css'
})
export class TableOfContentsComponent {

}
