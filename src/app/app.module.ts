import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { NgModule } from '@angular/core';
import { MdCardModule, MdGridListModule, MdButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

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
  ],
  providers: [
    QuizService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
