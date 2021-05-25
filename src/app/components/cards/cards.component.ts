import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiResponse, Cases, Countries, Data } from '../../app.model';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  data: Data[];
  global: Data = new Data();
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getInfo();
    this.getGlobalInfo();
  }
  getInfo() {
    let filter = new Data();
    filter.country = '';
    this.appService.getDataMk().subscribe((result: any) => {
      this.data = result;
      console.log(result[0].recovered);
    });
  }
  getGlobalInfo() {
    this.appService.getGlobalData().subscribe((result: any) => {
      this.global = result.result;
      console.log(result.result);
    });
  }
}
