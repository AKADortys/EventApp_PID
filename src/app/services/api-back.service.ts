import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRegist, User } from '../models/users.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiBackService {
  private baseUrl = environment.apiUrl;
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
      withCredentials: true, // Inclure les cookies
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
  //AUTH
  register(userData: UserRegist): Observable<User> {
    return this.request('POST', 'users', userData);
  }
  login(userData: any): Observable<User> {
    return this.request('POST', 'auth/login', userData);
  }
  logout() {
    return this.request('POST', 'auth/logout');
  }
  //EVENT
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
  getEventByOrganizer(
    id: string | undefined,
    page = 1,
    limit = 12,
    search = '',
  ): Observable<any> {
    return this.request(
      'GET',
      `events/${id}/organizer?page=${page}&limit=${limit}&search=${search}`,
    );
  }
  createEvent(data: any): Observable<any> {
    return this.request('POST', 'events', data);
  }
  updateEvent(id: string | null, data: any): Observable<any> {
    return this.request('PUT', `events/${id}`, data);
  }
  deleteEvent(id: string): Observable<any> {
    return this.request('DELETE', `events/${id}`);
  }
  //REGISTRATION
  getEventRegistrations(
    id: string,
    page = 1,
    limit = 12,
    search = '',
  ): Observable<any> {
    return this.request(
      'GET',
      `events/${id}/registrations?page=${page}&limit=${limit}&search=${search}`,
    );
  }
  findRegistration(data: any): Observable<any> {
    return this.request('POST', 'registrations/findOne', data);
  }
  createRegistration(data: any): Observable<any> {
    return this.request('POST', 'registrations', data);
  }
  updateRegistration(id: string, data: any): Observable<any> {
    return this.request('PUT', `registrations/${id}`, data);
  }
  deleteRegistration(id: string): Observable<any> {
    return this.request('DELETE', `registrations/${id}`);
  }
  //USER
  getUserRegistrations(
    id: string,
    page = 1,
    limit = 12,
    search = '',
  ): Observable<any> {
    return this.request(
      'GET',
      `users/${id}/registrations?page=${page}&limit=${limit}&search=${search}`,
    );
  }
  updateUser(id: string | undefined, data: any): Observable<any> {
    return this.request('PUT', `users/${id}`, data);
  }
  getUser(id: string): Observable<any> {
    return this.request('GET', `users/${id}`);
  }
}
