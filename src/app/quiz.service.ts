import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Quiz, Repository, Question, LANGUAGES } from './quiz';
import { REPOSITORIES } from './mock-repository';
import { inplaceShuffle } from './utils';

const CHOISES_COUNT = 4;
const COUNT_QUESTIONS = 7;


@Injectable()
export class QuizService {
  constructor(private http: Http) { }

  getRepository(): Promise<Repository> {
    let languages = LANGUAGES;
    inplaceShuffle(languages);
    let lang = languages[0];

    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    let weekAgoDate = weekAgo.toISOString().slice(0, 10);

    let params: URLSearchParams = new URLSearchParams();
    params.set("sort", "star");
    params.set("order", "desc");
    params.set("q", `created:${weekAgoDate} language:${lang.toLowerCase()}`)

    return this.http.get(
      'https://api.github.com/search/repositories',
      {
        params: params
      }
    ).toPromise().then(
      response => {
        let items = response.json().items;
        inplaceShuffle(items);
        return {
          name: items[0].full_name,
          language: lang,
        }
      }
    ).catch(error => undefined);
  }

  getRepositories(): Promise<Repository[]> {
    let repos = [];
    for(var i = 0; i < COUNT_QUESTIONS; i++) {
      repos.push(this.getRepository());
    }

    return Promise
      .all(repos);
  }

  getQuiz(): Promise<Quiz> {
    return this.getRepositories().then(
      repositories => {
        let questions = repositories.filter(x => x !== undefined).map(this.generateAnswer);
        return {
          questions: questions,
        };
      }
    );
  }

  generateAnswer(repository: Repository): Question {
    let languages = LANGUAGES.filter(lang => lang !== repository.language);
    inplaceShuffle(languages);

    let choices = languages.slice(0, CHOISES_COUNT - 1)
    choices.push(repository.language);
    inplaceShuffle(choices);

    return {
      name: repository.name,
      answer: repository.language,
      choices: choices,
    }
  }
}
