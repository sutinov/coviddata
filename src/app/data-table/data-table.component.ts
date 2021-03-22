import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Countries, sortData } from '../app.model';
import { AppService } from '../app.service';
import { DataTableDataSource } from './data-table-datasource';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Countries>;
  @ViewChild('paginator', { read: MatPaginator }) paginatorlist: MatPaginator;
  dataSource: DataTableDataSource;
  filter: sortData = new sortData();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];
  scrWidth: any;
  constructor(public appService: AppService) {}
  ngOnInit() {
    this.filter.pageNumber = 1;
    this.filter.pageSize = 15;
    this.dataSource = new DataTableDataSource(this.appService);
    this.dataSource.loadData(this.filter);
    this.setupTable();
    this.getScreenSize();
  }

  pageChanged(event: PageEvent) {
    this.filter.pageSize = event.pageSize;
    this.filter.pageNumber = event.pageIndex + 1;
    this.dataSource.loadFilteredData(this.filter);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    // console.log(this.scrWidth);
  }

  setupTable() {
    this.displayedColumns = [
      'country',
      'cases',
      'active',
      'todayDeaths',
      'recovered',
    ];
  }
}
