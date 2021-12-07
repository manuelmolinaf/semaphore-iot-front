import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IotApiService {

  constructor(private http: HttpClient) { }

   getStepsTaken(): Observable<number> {
    return this.http.get<number>(`http://localhost:5001/stepsTaken`);
  }
}

