import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import type { Compound } from '../models/compound';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  private apiUrl = 'http://localhost:3000/api/compounds';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  getCompounds(page: number = 1, pageSize: number = 10): Observable<{ compounds: Compound[]; total: number }> {
    return this.http.get<Compound[]>(this.apiUrl,this.getAuthHeaders()).pipe(
      map(compounds => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return {
          compounds: compounds.slice(start, end),
          total: compounds.length
        };
      }),
      catchError(error => {
        console.error('Error fetching compounds:', error);
        return throwError(() => new Error('Failed to fetch compounds'));
      })
    );
  }

  getCompound(id: string): Observable<Compound> {
    return this.http.get<Compound>(`${this.apiUrl}/${id}`,this.getAuthHeaders()).pipe(
      catchError(error => {
        console.error('Error fetching compound:', error);
        return throwError(() => new Error('Failed to fetch compound'));
      })
    );
  }

  createCompound(compound: Omit<Compound, 'id'>): Observable<Compound> {
    return this.http.post<Compound>(this.apiUrl, compound,this.getAuthHeaders()).pipe(
      catchError(error => {
        console.error('Error creating compound:', error);
        return throwError(() => new Error('Failed to create compound'));
      })
    );
  }

  updateCompound(id: string, compound: Partial<Compound>): Observable<Compound> {
    return this.http.put<Compound>(`${this.apiUrl}/${id}`, compound,this.getAuthHeaders()).pipe(
      catchError(error => {
        console.error('Error updating compound:', error);
        return throwError(() => new Error('Failed to update compound'));
      })
    );
  }

  deleteCompound(id: string): Observable<Compound> {
    return this.http.delete<Compound>(`${this.apiUrl}/${id}`,this.getAuthHeaders()).pipe(
      catchError(error => {
        console.error('Error deleting compound:', error);
        return throwError(() => new Error('Failed to delete compound'));
      })
    );
  }
}
