import {Component, OnInit, Pipe} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { ChapterService } from '../chapter.service';
import { Chapter } from '../chapter';

@Component({
  selector: 'app-pm-chapter-details',
  templateUrl: './chapter-details.component.html',
  styleUrls: ['./chapter-details.component.css']
})
export class ChapterDetailsComponent implements OnInit {
  pageTitle = 'Chapter Details';
  errorMessage: string;
  chapterForm: FormGroup;
  chapter: Chapter | null;
  sub: Subscription;

  constructor(private fb: FormBuilder,
              private chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router
              ) {
              }

  ngOnInit(): void {
    this.chapterForm = this.fb.group({
      chapterName: ['', Validators.required],
      chapterSentence: [''],
      puzzle: [''],
      mainCharacter: ['']
    });
    this.sub = this.chapterService.selectedChapterChanges$.subscribe(
      selectedChapter => this.displayChapter(selectedChapter)
    );
  }

  onBack(): void {
    this.router.navigate(['/chapters']);
  }

  displayChapter(chapter: Chapter): void {
    // Set the local chapter property
    this.chapter = chapter;
    // Reset the form back to pristine
    this.chapterForm.reset();
    // Display the appropriate page title
    if (this.chapter) {
      if (this.chapter.chapterName === 'New') {
        this.pageTitle = 'Add chapter';
      } else {
        this.pageTitle = `Details: ${this.chapter.chapterName}`;
      }
      this.chapterForm.patchValue({
        name: this.chapter.chapterName,
        chapterSentance: this.chapter.chapterSentence,
        puzzle: this.chapter.puzzle,
        mainCharacter: this.chapter.mainCharacter
      });
    }
  }
  cancelEdit(): void {
    // Redisplay the currently selected chapter
    this.displayChapter(this.chapter);
  }

  saveChapter(): void {
    if (this.chapterForm.valid) {
      if (this.chapterForm.dirty) {
        const p = {...this.chapter, ...this.chapterForm.value};
          this.chapterService.createChapter(p).subscribe(
            chapter => this.chapterService.changeSelectedChapter(chapter),
            (err: any) => this.errorMessage = err.error
          );
      } else {
        this.errorMessage = 'Please correct the validation errors.';
      }
    }

  }

}
