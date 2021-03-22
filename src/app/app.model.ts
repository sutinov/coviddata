export class Data {
  constructor(
    public country?: string,
    public confirmed?: number,
    public deaths?: number,
    public lastUpdate?: Date,
    public recovered?: number,
    public critical?: number,
    public totalCases?: number,
    public totalDeaths?: number,
    public totalRecovered?: number
  ) {}
}
export class sortData {
  constructor(
    public pageSize?: number,
    public pageNumber?: number,
    public pageIndex?: number,
    public sortColumn?: string,
    public sortDirection?: string,
    public todayCases?: boolean
  ) {}
}
// export class CountryInfo {
//   constructor(
//     public country?: string,
//     public id?: number,
//     public flag?: string
//   ) {}
// }

// export class countryData {
//   constructor(
//     public active?: number,
//     public cases?: number,
//     public deaths?: number,
//     public recovered?: number,
//     public tests?: number,
//     public country?: string,
//     public countryInfo?: CountryInfo[],
//     public todayCases?: number
//   ) {}
// }

export class ApiResponse {
  constructor(public response?: Countries[], public Data?: Data[]) {}
}

export class Countries {
  constructor(
    public continent?: string,
    public country?: string,
    public active?: number,
    public cases?: number,
    public todayCases?: number,
    public todayDeaths?: number,
    public todayRecovered?: number
  ) {}
}

export class Cases {
  constructor(
    public $new?: number,
    public active?: number,
    public recovered?: number,
    public total?: number
  ) {}
}
export class Deaths {
  constructor(public total?: number, public $new?: number) {}
}
