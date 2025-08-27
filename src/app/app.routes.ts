import { Routes } from '@angular/router';

import { Sheet1Component } from './sheet1/sheet1.component';
import { Sheet2Component } from './sheet2/sheet2.component';
import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';
import { ContentComponent } from './content/content.component';

export const routes: Routes = [
    { path: 'content/:id', component: ContentComponent, title: 'Loading content...' },
    { path: '**', component: TableOfContentsComponent },
];
