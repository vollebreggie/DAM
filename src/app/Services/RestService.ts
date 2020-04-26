import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from './AuthenticationService';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse, ErrorCode } from '../Models/Responses/ApiReponse';

export class RestService<T> {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  private _apiEndPoint: string = environment.apiUrl + "api/";
  constructor(private _url: string, private _http: HttpClient, private _authenticationService: AuthenticationService) { }

  getAll(): Observable<ApiResponse<T[]>> {
    return this.mapAndCatchError(
      this._http.get<ApiResponse<T[]>>(this._apiEndPoint + this._url
        , this.httpOptions)
    );
  }

  get(id: number): Observable<ApiResponse<T>> {
    return this.mapAndCatchError(
      this._http.get<ApiResponse<T>>(`${this._apiEndPoint + this._url}/${id}`
        , this.httpOptions)
    );
  }

  add(resource: T): Observable<ApiResponse<number>> {
    return this.mapAndCatchError(
      this._http.post<ApiResponse<number>>(
        this._apiEndPoint + this._url,
        resource,
        this.httpOptions)
    );
  }
  // update and remove here...

  // common method
  makeRequest<TData>(method: string, prefixUrl?: string, data?: any)
    : Observable<ApiResponse<TData>> {
    prefixUrl = prefixUrl != undefined ? prefixUrl : "";
    let finalUrl: string = this._apiEndPoint + this._url + prefixUrl;
    let body: any = null;
    if (method.toUpperCase() == 'GET' && data) {
      finalUrl += '?' + this.objectToQueryString(data);
    }
    else {
      body = data;
    }
    return this.mapAndCatchError<TData>(
      this._http.request<ApiResponse<TData>>(
        method.toUpperCase(),
        finalUrl,
        { body: body, headers: this._authenticationService.getHttpHeaderWithToken().headers })
    );
  }

  // common method
  makeImageRequest<TData>(method: string, prefixUrl?: string, data?: any)
    : Observable<ApiResponse<TData>> {
    prefixUrl = prefixUrl != undefined ? prefixUrl : "";
    let finalUrl: string = this._apiEndPoint + this._url + prefixUrl;
    let body: any = null;
    if (method.toUpperCase() == 'GET' && data) {
      finalUrl += '?' + this.objectToQueryString(data);
    }
    else {
      body = data;
    }
    return this.mapAndCatchError<TData>(
      this._http.request<ApiResponse<TData>>(
        method.toUpperCase(),
        finalUrl,
        { body: body, headers: this._authenticationService.httpImageOptions.headers })
    );
  }

  /////// private methods
  private mapAndCatchError<TData>(response: Observable<ApiResponse<TData>>)
    : Observable<ApiResponse<TData>> {
    return response.pipe(
      map((r: ApiResponse<TData>) => {
        var result = new ApiResponse<TData>(r);
        return result;
      }),
      catchError((err: HttpErrorResponse) => {
        var result = new ApiResponse<TData>();
        Object.assign(result, err.error)
        // if err.error is not ApiResponse<TData> e.g. connection issue
        if (result.errors.length == 0) {
          result.errors.push({ code: ErrorCode.UnknownError, text: 'Unknown error.' });
        }
        return of(result);
      })
    );
  }

  private objectToQueryString(obj: any): string {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
}