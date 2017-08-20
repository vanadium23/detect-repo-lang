import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { NgModule } from '@angular/core';
import { MdCardModule, MdGridListModule, MdButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppComponent } from './app.component';
import { QuizService } from './quiz.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,

    MdCardModule,
    MdGridListModule,
    MdButtonModule,

    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    RouterModule.forRoot([])
  ],
  providers: [
    QuizService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
