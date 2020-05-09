import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class TestComponent implements OnInit {
  cols: any[];
  InvoiceList;
  Title='لیست فاکتور ها';
  dataSource ;
  ordingdata;
  first = 0;
  rows = 10;
  GetFactorDto = {
    ISAllType : true,
    FactorType: FactorType.Factor,
    StartDate: '',
    EndDate: '',
    ClientID: 0
  };
  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'dateTime', header: 'dateTime' },
      { field: 'totalPrice', header: 'totalPrice' },
      { field: 'factorType', header: 'factorType' }
  ];
    this.api.GetUserFactorList(this.GetFactorDto).subscribe(
      res => {this.InvoiceList = res.data;
              this.InvoiceList = this.InvoiceList;
              // this.dataSource = new MatTableDataSource<PeriodicElement>(this.InvoiceList);
              this.dataSource=this.InvoiceList;
              this.ordingdata=this.InvoiceList;
         },
      error => {console.log('در فرایند لود فاکتورها مشکلی پیش آمده'); });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Filter() {
    this.api.GetUserFactorList(this.GetFactorDto).subscribe(
      res => {this.InvoiceList = res;
              this.InvoiceList = this.InvoiceList.data;
              this.ordingdata=this.InvoiceList;
              this.dataSource = this.InvoiceList;
         },
      error => {console.log('در فرایند لود فاکتورها مشکلی پیش آمده'); });
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;

  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === (this.dataSource.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
  filtertext(text){
  this.dataSource=this.filterItems(this.ordingdata,text);

  }
  filterItems(itemList: any, searchKeyword: string) {
  if (!itemList)
      return [];
    if (!searchKeyword)
      return itemList;
    let filteredList = [];
    if (itemList.length > 0) {
      searchKeyword = searchKeyword.toLowerCase();
      itemList.forEach(item => {
        //Object.values(item) => gives the list of all the property values of the 'item' object
        let propValueList = Object.values(item);
        for(let i=0;i<propValueList.length;i++)
        {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1)
            {
              filteredList.push(item);
              break;
            }
          }
        }
      });
    }
    return filteredList;
  }
}
export interface PeriodicElement {
  dateTime: string;
  id: number;
  totalPrice: number;
  factorType: FactorType;
}
export enum FactorType {
  PishFactor,
  Factor,
  PendingToAccept
}
const ELEMENT_DATA: PeriodicElement[] = [
  // {id: 1, dateTime: 'Hydrogen', totalPrice: 1.0079, factorType: 'H'},
  // {id: 2, dateTime: 'Helium', totalPrice: 4.0026, factorType: 'He'},
  // {id: 3, dateTime: 'Lithium', totalPrice: 6.941, factorType: 'Li'},
  // {id: 4, dateTime: 'Beryllium', totalPrice: 9.0122, factorType: 'Be'},
  // {id: 5, dateTime: 'Boron', totalPrice: 10.811, factorType: 'B'},
  // {id: 6, dateTime: 'Carbon', totalPrice: 12.0107, factorType: 'C'},
  // {id: 7, dateTime: 'Nitrogen', totalPrice: 14.0067, factorType: 'N'},
  // {id: 8, dateTime: 'Oxygen', totalPrice: 15.9994, factorType: 'O'},
  // {id: 9, dateTime: 'Fluorine', totalPrice: 18.9984, factorType: 'F'},
  // {id: 10, dateTime: 'Neon', totalPrice: 20.1797, factorType: 'Ne'},
  // {id: 11, dateTime: 'Sodium', totalPrice: 22.9897, factorType: 'Na'},
  // {id: 12, dateTime: 'Magnesium', totalPrice: 24.305, factorType: 'Mg'},
  // {id: 13, dateTime: 'Aluminum', totalPrice: 26.9815, factorType: 'Al'},
  // {id: 14, dateTime: 'Silicon', totalPrice: 28.0855, factorType: 'Si'},
  // {id: 15, dateTime: 'Phosphorus', totalPrice: 30.9738, factorType: 'P'},
  // {id: 16, dateTime: 'Sulfur', totalPrice: 32.065, factorType: 'S'},
  // {id: 17, dateTime: 'Chlorine', totalPrice: 35.453, factorType: 'Cl'},
  // {id: 18, dateTime: 'Argon', totalPrice: 39.948, factorType: 'Ar'},
  // {id: 19, dateTime: 'Potassium', totalPrice: 39.0983, factorType: 'K'},
  // {id: 20, dateTime: 'Calcium', totalPrice: 40.078, factorType: 'Ca'},
];
