import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ChapterData } from './chapter-data';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './home/page-not-found.component';
import {ChapterDetailsComponent} from "./chapter-details/chapter-details.component";
import {ChapterListComponent} from './chapter-list/chapter-list.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ChapterDetailsComponent,
    ChapterListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ChapterData),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
