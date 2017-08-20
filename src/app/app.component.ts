import { Component } from '@angular/core';

import { Quiz } from './quiz';
import { QuizService } from './quiz.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [QuizService]
})
export class AppComponent {
  title = 'app';
  step: string = 'start';
  quiz: Quiz;
  questionIndex: number = 0;
  userScore: number = 0;
  userAnswer: string;

  constructor(private quizService: QuizService, private angulartics2: Angulartics2) { }

  emitEvent(eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
      this.angulartics2.eventTrack.next({
        action: eventAction,
        properties: {
          category: eventCategory,
          lavel: eventLabel,
          value: eventValue
        }
      });
  }

  startQuiz() {
    this.quizService.getQuiz().then(quiz => {
      if (quiz.questions.length > 0) {
        this.questionIndex = 0;
        this.userScore = 0;

        this.emitEvent('detect-repo-lang', 'quizStarted', 'quizLength', quiz.questions.length);

        this.quiz = quiz;
        this.step = 'quiz';
      } else {
        this.emitEvent('detect-repo-lang', 'quizError');
        this.step = 'error';
      }
    })
  }

  setUserAnswer(answer: string) {
    if(this.userAnswer === undefined) {
      this.userAnswer = answer;
      if (answer == this.quiz.questions[this.questionIndex].answer) {
        this.emitEvent('detect-repo-lang', 'quizCorrectAnswer');
        this.userScore += 1;
      }
    }
  }

  goToNextQuestion() {
    this.userAnswer = undefined;
    this.questionIndex++;
    if(this.questionIndex >= this.quiz.questions.length) {
      this.emitEvent('detect-repo-lang', 'quizFinished', 'userScore', this.userScore);
      this.step = 'finish';
    }
  }

  isIncorrectAnswer(answer: string) {
    if(this.userAnswer === undefined) {
      return false;
    }
    return answer === this.userAnswer && this.userAnswer !== this.quiz.questions[this.questionIndex].answer;
  }

  isCorrectAnswer(answer: string) {
    if(this.userAnswer === undefined) {
      return false;
    }
    return answer === this.quiz.questions[this.questionIndex].answer;
  }

  isDisabledAnswer(answer: string) {
    if(this.userAnswer === undefined) {
      return false;
    }
    return !this.isCorrectAnswer(answer) && !this.isIncorrectAnswer(answer);
  }
}
