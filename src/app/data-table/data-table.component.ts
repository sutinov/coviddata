import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Countries, sortData } from '../app.model';
import { AppService } from '../app.service';
import { DataTableDataSource } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Countries>;
  dataSource: DataTableDataSource;
  filter: sortData = new sortData();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'country',
    'cases',
    'todayCases',
    'todayDeaths',
    'active',
    'recovered',
  ];

  constructor(public appService: AppService) {}
  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.appService);
    this.sortData(false);
  }
  sortData(isChange: boolean) {
    if (isChange) {
      this.filter.pageSize = this.paginator.pageSize;
      this.filter.pageNumber = this.paginator.pageIndex + 1;
      this.filter.sortColumn = this.sort.active;
      this.filter.sortDirection = this.sort.direction;
      console.log(this.filter);
    } else {
      this.filter.pageSize = 10;
      this.filter.pageNumber = 1;
      this.filter.sortColumn = 'firstName';
      this.filter.sortDirection = 'asc';
      console.log(this.filter);
    }
    this.dataSource.loadData(this.filter);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.sortData(true)))
      .subscribe();
  }
}
