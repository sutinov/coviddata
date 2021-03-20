import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Countries, Data, sortData } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  public getData(filter: sortData): Observable<Countries> {
    let header = new HttpHeaders({
      'x-rapidapi-key': 'fe8b693605msha3b9ce3bddd7e80p14b449jsnaf70afb81e99',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    });

    return this.httpClient.get<Countries>(
      'https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=todayCases&allowNull=false'
    );
  }
  public getDataMk(): Observable<ApiResponse> {
    let header = new HttpHeaders({
      'x-rapidapi-key': 'fe8b693605msha3b9ce3bddd7e80p14b449jsnaf70afb81e99',
      'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    });
    return this.httpClient.get<ApiResponse>(
      'https://covid-19-data.p.rapidapi.com/country/code?code=mk',

      { headers: header }
    );
  }
  public getGlobalData(): Observable<ApiResponse> {
    let header = new HttpHeaders({
      'x-rapidapi-key': 'fe8b693605msha3b9ce3bddd7e80p14b449jsnaf70afb81e99',
      'x-rapidapi-host': 'covid-19-coronavirus-statistics2.p.rapidapi.com',
    });
    return this.httpClient.get<ApiResponse>(
      'https://covid-19-coronavirus-statistics2.p.rapidapi.com/totalData',

      { headers: header }
    );
  }
}
