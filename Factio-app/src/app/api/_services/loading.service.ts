import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invoice } from '../_models';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'any',
  })
  export class LoadingService {
    private _loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loading.asObservable();
  
    constructor() {}
  
    show() {
      this._loading.next(true);
    }
  
    hide() {
      this._loading.next(false);
    }
  }