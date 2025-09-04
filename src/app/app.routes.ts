import { Routes } from '@angular/router';

import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';
import { ContentComponent } from './content/content.component';

export const routes: Routes = [
    { path: 'content/:id', component: ContentComponent, title: 'Loading content...' },
    { path: '**', component: TableOfContentsComponent },
];
