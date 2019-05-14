import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Chapter } from './chapter';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  private chaptersUrl = 'api/chapters';
  private chapters: Chapter[];
  private chapter: Chapter;

  private selectedChapterSource = new BehaviorSubject<Chapter| null>(null);
  selectedChapterChanges$ = this.selectedChapterSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedChapter(selectedChapter: Chapter | null): void {
    this.selectedChapterSource.next(selectedChapter);
  }

  getChapters(): Observable<Chapter[]> {
    if (this.chapters) {
      return of(this.chapters);
    }
    return this.http.get<Chapter[]>(this.chaptersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.chapters = data),
        catchError(this.handleError)
      );
  }

  getChapter(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(this.chaptersUrl + '/' + id)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.chapter = data),
        catchError(this.handleError)
      );
  }

  // Return an initialized Chapter
  newChapter(id: number): Chapter {
    const idNumber = id;
    return {
      id: idNumber,
      chapterName: 'New',
      chapterSentence: '',
      puzzle: '',
      mainCharacter: ''
    };
  }

  createChapter(chapter: Chapter): Observable<Chapter> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    chapter.id = null;
    return this.http.post<Chapter>(this.chaptersUrl, chapter, { headers: headers })
      .pipe(
        tap(data => console.log('createChapter: ' + JSON.stringify(data))),
        tap(data => {
          this.chapters.push(data);
        }),
        catchError(this.handleError)
      );
  }

  deleteChapter(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.chaptersUrl}/${id}`;
    return this.http.delete<Chapter>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteChapter: ' + id)),
        tap(data => {
          const foundIndex = this.chapters.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.chapters.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError)
      );
  }

  updateChapter(chapter: Chapter): Observable<Chapter> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.chaptersUrl}/${chapter.id}`;
    return this.http.put<Chapter>(url, chapter, { headers: headers })
      .pipe(
        tap(() => console.log('updateChapter: ' + chapter.id)),
        tap(() => {
          const foundIndex = this.chapters.findIndex(item => item.id === chapter.id);
          if (foundIndex > -1) {
            this.chapters[foundIndex] = chapter;
          }
        }),
        map(() => chapter),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
