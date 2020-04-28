import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'jalali-moment';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Data } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dateTime', 'totalPrice', 'factorPrice'];
  dataSource ;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  InvoiceList  ;
  GetFactorDto = {
    ISAllType : true,
    FactorType: FactorType.Factor,
    StartDate: '',
    EndDate: '',
    ClientID: 0
  };
  constructor(private api: ApiServiceService) {

   }
  Filter() {
    this.api.GetUserFactorList(this.GetFactorDto).subscribe(
      res => {this.InvoiceList = res;
              this.InvoiceList = this.InvoiceList.data;
              
              this.dataSource = new MatTableDataSource<PeriodicElement>(this.InvoiceList);
         },
      error => {console.log('در فرایند لود فاکتورها مشکلی پیش آمده'); });
   }
  ngOnInit(): void {
this.api.GetUserFactorList(this.GetFactorDto).subscribe(
  res => {this.InvoiceList = res;
          this.InvoiceList = this.InvoiceList.data;
          
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.InvoiceList);
          
     },
  error => {console.log('در فرایند لود فاکتورها مشکلی پیش آمده') }
);
this.dataSource.paginator = this.paginator;
  }

}
export interface PeriodicElement {
  dateTime: string;
  totalPrice: number;
  taxes: number;
  discount: number;
  factorPrice: number;
  user_ID: number;
  client_ID: number;
  factorCodeView: string;
  discription: string;
  factorType: FactorType;
  product_Factor: [{
    productAndService_ID: number,
    factor_ID: number,
    width: number,
    length: number,
    unit: number,
    unitPrice: number,
    price: number,
    rowDiscription: string,
    productAndService: string,
    id: number,
    metraj: number
  }];
  id: number;
  dateTimevalu: Data;
  user_Name: string;
  userName: string;
}
enum FactorType {
  PishFactor,
  Factor,
  PendingToAccept
}
