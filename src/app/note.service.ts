import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service to save and load notes of a component (training sheet) from local storage.
 */
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
