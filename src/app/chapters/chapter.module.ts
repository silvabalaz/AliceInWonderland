import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChapterShellComponent } from './chapter-shell/chapter-shell.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

const ChapterRoutes: Routes = [
  { path: '', component: ChapterShellComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ChapterRoutes),
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ChapterShellComponent,
    ChapterListComponent
  ]
})
export class ChapterModule { }
