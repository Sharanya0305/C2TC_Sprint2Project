import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mall {
  id?: number;
  mallName: string;
  location: string;
  totalShops: number;
  areaSqFt: number;
}

@Injectable({ providedIn: 'root' })
export class MallService {
  private baseUrl = 'http://localhost:8080/mall1service';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mall[]> {
    return this.http.get<Mall[]>(this.baseUrl);
  }

  create(mall: Mall): Observable<Mall> {
    return this.http.post<Mall>(this.baseUrl, mall);
  }

  update(id: number, mall: Mall): Observable<Mall> {
    return this.http.put<Mall>(`${this.baseUrl}/${id}`, mall);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}