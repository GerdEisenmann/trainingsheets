import { Component, OnInit } from '@angular/core';
import { SheetNavigationComponent } from '../sheet-navigation/sheet-navigation.component';
import { NoteComponent } from '../note/note.component';
import { NoteService } from '../note.service';
import { CommonModule } from '@angular/common';
import { Content } from '../model/content';
import { ToCService } from '../toc.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs';

/**
 * Usa a content component to display the contents of a trainings sheet.
 */
@Component({
  selector: 'app-sheet1',
  imports: [ CommonModule, SheetNavigationComponent, NoteComponent ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

    protected content: Content|null;
    protected htmlContent: string|null;

    constructor(
        private route: ActivatedRoute,
        protected tocService: ToCService
    ) {
        this.content = null;
        this.htmlContent = null;
    }  

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.content = await this.tocService.getContent(id);
        this.htmlContent = await this.tocService.loadContent(id);

        this.route.paramMap
            .pipe(
                concatMap(id => this.tocService.getContent(id.get('id'))),
                tap((content:Content|null) => {
                    this.content = content;
                }),
                concatMap((content:Content|null) => this.tocService.loadContent(content?.uid||null)),
                tap((html: string) => {
                    this.htmlContent = html;
                })
            )
            .subscribe()    
        }  

}
