import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  public save(key: string, value: string): void {
    if(value) {
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.removeItem(key);
    }
  }

  public get(key: string): string | null {
    return window.localStorage.getItem(key);
  }
}
