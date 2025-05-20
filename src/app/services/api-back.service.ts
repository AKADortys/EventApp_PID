import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRegist, User } from '../models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiBackService {
  private baseUrl = 'http://localhost:3300';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Inclure les cookies dans les requêtes
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private request<T>(
    method: string,
    endpoint: string,
    data?: any,
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = this.getHeaders();

    const options = {
      headers: headers,
      withCredentials: true, // Inclure les cookies dans les requêtes
    };

    switch (method) {
      case 'GET':
        return this.http
          .get<T>(url, options)
          .pipe(catchError(this.handleError));
      case 'POST':
        return this.http
          .post<T>(url, data, options)
          .pipe(catchError(this.handleError));
      case 'PUT':
        return this.http
          .put<T>(url, data, options)
          .pipe(catchError(this.handleError));
      case 'DELETE':
        return this.http
          .delete<T>(url, options)
          .pipe(catchError(this.handleError));
      default:
        throw new Error(`Method ${method} not supported.`);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      if (error.error?.message) {
        errorMessage = `Erreur ${error.status} : ${error.error.message}`;
      } else {
        errorMessage = `Erreur ${error.status} : ${JSON.stringify(error.error.errors)}`;
      }
    }

    console.error('[ApiBackService] handleError =>', errorMessage);

    return throwError(() => new Error(errorMessage));
  }

  register(userData: UserRegist): Observable<User> {
    return this.request('POST', 'users', userData);
  }
  login(userData: any): Observable<User> {
    return this.request('POST', 'auth/login', userData);
  }
  logout() {
    return this.request('POST', 'auth/logout');
  }
  getEvents(
    search: string = '',
    page: number = 1,
    limit: number = 12,
  ): Observable<any> {
    return this.request(
      'GET',
      `events/?page=${page}&search=${search}&limit=${limit}`,
    );
  }

  getEventById(id: string): Observable<any> {
    return this.request('GET', `events/${id}`);
  }
}
