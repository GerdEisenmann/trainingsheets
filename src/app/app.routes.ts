import { Routes } from '@angular/router';

import { Sheet1Component } from './sheet1/sheet1.component';
import { Sheet2Component } from './sheet2/sheet2.component';
import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';

export const routes: Routes = [
    { path: 'sheet1', component: Sheet1Component, title: 'Sheet 1' },
    { path: 'sheet2', component: Sheet2Component, title: 'Sheet 2'  },
    { path: '**', component: TableOfContentsComponent },
];
