import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDatatableService {

  private apiUrl = 'https://testapp.touchworldtechnology.com/interview/test/v1/product/users';

  constructor(private http: HttpClient) { }

  getUsers(count: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('count', count.toString())
      .set('page', page.toString());

    console.log('API URL with params:', this.apiUrl, params.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

}
