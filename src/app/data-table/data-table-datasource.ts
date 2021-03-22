import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { ApiResponse, Countries, sortData } from '../app.model';
import { AppService } from '../app.service';

export class DataTableDataSource extends DataSource<Countries> {
  private allData = new BehaviorSubject<Countries[]>([]);

  public dataSubject = new BehaviorSubject<Countries[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private totalDataCountSubject = new BehaviorSubject<number>(0);

  public totalDataCount$ = this.totalDataCountSubject.asObservable();
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private appService: AppService) {
    super();
  }

  loadFilteredData(filter: sortData) {
    this.allData.subscribe((data) => {
      const filteredData = data.slice(
        (filter.pageNumber - 1) * filter.pageSize,
        filter.pageNumber * filter.pageSize
      );
      this.dataSubject.next(filteredData);
    });
  }

  loadData(filter: sortData) {
    this.appService
      .getData(filter)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((data: any) => {
        // console.log(data.response);
        if (data) {
          this.totalDataCountSubject.next(data.length);
          this.allData.next(data);
          this.loadFilteredData(filter);
          console.log(data.length);
        }
      });
  }

  connect(): Observable<Countries[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
    this.totalDataCountSubject.complete();
    this.loadingSubject.complete();
  }
}
