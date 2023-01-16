import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

export abstract class BaseService<T = any>{
  data: BehaviorSubject<Map<string, any>> = new BehaviorSubject<Map<string, any>>(new Map<string, any>);
  protected baseUrl = 'http://localhost:3000/dev/';

  protected constructor(
    protected endpoint: string,
    private http: HttpClient,
  ) { }

  /**
   * Returning the path/storage key for the data map, in order to cache
   * @param args
   * @protected
   */
  protected abstract getItemPath(...args: string[]): string;

  protected get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.endpoint}/${path}`);
  }
}
