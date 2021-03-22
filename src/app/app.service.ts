import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Countries, Data, sortData } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}
  private data: [];

  public getData(filter: sortData): Observable<any> {
    const proxy =
      'https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=todayCases&allowNull=false';
    let header = new HttpHeaders({
      'x-rapidapi-key': 'fe8b693605msha3b9ce3bddd7e80p14b449jsnaf70afb81e99',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    });
    const params = new HttpParams()
      .set('yesterday', 'true')
      .set('twoDaysAgo', 'false')
      .set('sort', 'todayCases')
      .set('allowNull', 'false');
    const dataUrl = 'https://disease.sh/v3/covid-19/countries';

    // return this.httpClient.get<any>(dataUrl);
    return this.httpClient.get<any[]>(dataUrl, {
      params: params,
    });
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
