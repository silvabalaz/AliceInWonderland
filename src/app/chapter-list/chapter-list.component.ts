import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Chapter } from '../chapter';
import { ChapterService } from '../chapter.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit, OnDestroy {
  pageTitle = 'Chapters';
  errorMessage: string;

  chapters: Chapter[];

  selectedChapter: Chapter | null;
  sub: Subscription;

  constructor(private chapterService: ChapterService) { }

  ngOnInit(): void {
    this.sub = this.chapterService.selectedChapterChanges$.subscribe(
      selectedChapter => this.selectedChapter = selectedChapter
    );

    this.chapterService.getChapters().subscribe(
      (chapters: Chapter[]) => this.chapters = chapters,
      (err: any) => this.errorMessage = err.error
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  newChapter(id: number): void {
    this.chapterService.changeSelectedChapter(this.chapterService.newChapter(id));
  }

  chapterSelected(chapter: Chapter): void {
    this.chapterService.changeSelectedChapter(chapter);
  }

}
