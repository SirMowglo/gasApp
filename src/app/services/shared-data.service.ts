import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private subject = new Subject<void>();
  constructor() { }
  sendFilterEvent(){
    this.subject.next();
  }
  
  getFilterEvent(): Observable<void>{
    return this.subject.asObservable();
  }
}
