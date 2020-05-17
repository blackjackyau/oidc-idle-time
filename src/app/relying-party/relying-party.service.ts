import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RelyingPartyService {

  readonly url = environment.relyingPartyUrl;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<any>(`${this.url}/api/v1/employees`).pipe(
      map(result => {
        return result.data;
      })
    );
  }


}

export interface Employee {
    id: string,
    employee_name: string,
    employee_salary: string,
    employee_age: string
}