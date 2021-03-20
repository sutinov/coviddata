import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { ApiResponse, Countries, sortData } from '../app.model';
import { AppService } from '../app.service';

export class DataTableDataSource extends DataSource<Countries> {
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

  loadData(filter: sortData) {
    this.appService
      .getData(filter)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((data: any) => {
        // console.log(data.response);
        if (data) {
          this.totalDataCountSubject.next(data.totalCount$);
          this.dataSubject.next(data);
          // console.log(data);
        }
      });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Countries[]> {
    return this.dataSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.dataSubject.complete();
    this.totalDataCountSubject.complete();
    this.loadingSubject.complete();
  }
}
