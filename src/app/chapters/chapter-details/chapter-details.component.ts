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
  submitted = false;
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
      chapterName: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
      chapterSentence: [{value: '', disabled: true}],
      puzzle: [{value: '', disabled: true}],
      mainCharacter: [{value: '', disabled: true}]
    });
    this.sub = this.chapterService.selectedChapterChanges$.subscribe(
      selectedChapter => {
        if (selectedChapter.chapterName === 'New') {
          this.chapterForm.get('chapterName').enable();
          this.chapterForm.get('chapterSentence').enable();
          this.chapterForm.get('puzzle').enable();
          this.chapterForm.get('mainCharacter').enable();
        }
        this.displayChapter(selectedChapter)
      }
    );
    this.getChapter();
  }

  get f() { return this.chapterForm.controls; }
  get chapterName() { return this.chapterForm.get('chapterName'); }

  onBack(): void {
    this.router.navigate(['/chapters']);
  }

  getChapter(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.chapterService.getChapter(id)
      .subscribe(chapter => {
            this.chapter = chapter;
            this.displayChapter(this.chapter);
       });
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
        this.chapterForm.patchValue({
          chapterName: this.chapter.chapterName,
          chapterSentence: this.chapter.chapterSentence,
          puzzle: this.chapter.puzzle,
          mainCharacter: this.chapter.mainCharacter
        });
      }
    }
  }
  cancelEdit(): void {
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
