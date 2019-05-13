import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChapterShellComponent } from './chapter-shell/chapter-shell.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ChapterDetailsComponent } from './chapter-details/chapter-details.component';

const ChapterRoutes: Routes = [
  { path: '', component: ChapterShellComponent },
  { path: ':id', component: ChapterDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ChapterRoutes),
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ChapterShellComponent,
    ChapterListComponent,
    ChapterDetailsComponent
  ]
})
export class ChapterModule { }
