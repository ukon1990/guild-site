import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

export abstract class BaseService<T = any, ID = string>{
  data: BehaviorSubject<Map<ID, T>> = new BehaviorSubject<Map<ID, T>>(new Map<ID, T>);
  active: BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
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
