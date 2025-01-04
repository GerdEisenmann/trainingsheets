import { Component, Input, OnInit, Type } from '@angular/core';
import { routes } from '../app.routes';
import { Resolve, ResolveFn, Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet-navigation',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './sheet-navigation.component.html',
  styleUrl: './sheet-navigation.component.css'
})
export class SheetNavigationComponent implements OnInit {

  /** previous page (as route). Supress this input if there is no previous page */
  @Input()
  previous: string|undefined = '**'; 
  
  /** next page (as route).  Supress this input if there is no next page */
  @Input()
  next?: string = '**';


  previousTitle?: string | Type<Resolve<string>> | ResolveFn<string>;
  nextTitle?: string | Type<Resolve<string>> | ResolveFn<string>;

  ngOnInit(): void {
    // get the title of the previous and next page from the defined routes
    if(this.previous) {
        this.previousTitle = this.getRoute(this.previous)?.title;
    }
    if(this.next) {
      this.nextTitle = this.getRoute(this.next)?.title;
    }
  }


  private getRoute(routePath: string): Route | undefined {
    // find the defined root that matches the root path
    return routes.find(route => route.path === routePath);
  }

}
