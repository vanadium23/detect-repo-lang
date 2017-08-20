import { isDevMode } from '@angular/core';

export function getCountQuestions(): number {
    if (isDevMode()) {
        return 2;
    } else {
        return 10;
    }
}
  
export function inplaceShuffle(a: Array<string>) {
    for(let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
