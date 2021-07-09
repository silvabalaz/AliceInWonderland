import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { AppComponent } from './app.component';
import {PageNotFoundComponent} from './home/page-not-found.component';
import {WelcomeComponent} from './home/welcome.component';
import {ChapterDetailsComponent} from './chapter-details/chapter-details.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'chapters', component: ChapterListComponent },
    { path: 'details/:id', component: ChapterDetailsComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

