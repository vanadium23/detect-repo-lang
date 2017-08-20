export class Repository {
    name: string;
    language: string;
}

export class Question {
    name: string;
    answer: string;
    choices: string[];
}

export class Quiz {
    questions: Question[];
}

export const LANGUAGES: string[] = [
    'C',
    'C++',
    'Clojure',
    'CSS',
    'Go',
    'Haskell',
    'Java',
    'JavaScript',
    'Perl',
    'Python',
    'Ruby',
    'Scala',
]
