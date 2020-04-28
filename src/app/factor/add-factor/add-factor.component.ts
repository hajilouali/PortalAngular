import { Component, OnInit,Inject } from '@angular/core';
import { error } from 'protractor';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProdoctListModalComponent, Car, ProductRow } from '../prodoct-list-modal/prodoct-list-modal.component';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';
export interface DialogData {
  animal: ProductRow;
  name:Car[];
}
@Component({
  selector: 'app-add-factor',
  templateUrl: './add-factor.component.html',
  styleUrls: ['./add-factor.component.css']
})
export class AddFactorComponent implements OnInit {
  factorid;
  productlistinserver;
  name;
  rowFactor:RowsProduct[] =new Array();
  selectedCar: RowsProduct;
  FactorPrice;
  FactorDiscunt;
  FactorTotalPrice;
  userDiscunt;

  dto:{
    userID: number,
    discription: string,
    rows:RowDtoFactor []
  }={
    discription:'',
    userID:0,
    rows:new Array(),

  }
    
  constructor(private route:ActivatedRoute,private api :ApiServiceService,public dialog: MatDialog,private rout :Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(res=>{this.factorid=res.get('id');});
    
    this.api.GetProductList().subscribe(
      res=>{
        this.productlistinserver=res.data;
      },
      error=>console.log('مشکلی در فرایند دریافت لیست محصولات پیش آمده')
    );
    this.api.isAuthenticated().subscribe(res=>{   
     
      this.userDiscunt=res.data.discount;
    });
    if(this.factorid>0){
      this.api.GetFactorDto(this.factorid).subscribe(
        res =>
        {
          let respons = res.data;
          this.dto.discription=respons.discription;
          respons.product_Factor.forEach(element => {
            this.rowFactor.push(
            {
              productAndService_ID:element.productAndService_ID,
              width:element.width,
              length:element.length,
              unit:element.unit,
              unitPrice:element.unitPrice,
              rowDiscription:element.rowDiscription,
              producName:element.productAndService,
              rowcalculate:<number><unknown>element.metraj,
              rowprice:element.price
            }
            )
          });
          this.api.isAuthenticated().subscribe(res=>{   
     
            this.userDiscunt=res.data.discount;
            this.CalculatFactor();
          });
          
          
        }
      );
      
    }
  }
  viewCar(car: RowsProduct) {
    console.log(`detail:${ car.producName  }`);
    
}
SendFactor(){
  Swal.fire({
    icon: 'question',
    title: 'تاییدیه فاکتور',
    text: 'آیا از ارسال تایید فاکتور مورد نظر اطمینان دارید ؟',
    showCancelButton: true,
    confirmButtonText: 'تایید',
    cancelButtonText: 'انصراف',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.rowFactor.forEach(element => {
        this.dto.rows.push(
          {
            length:element.length,
            productAndService_ID:element.productAndService_ID,
            rowDiscription:element.rowDiscription,
            unit:element.unit,
            unitPrice:element.unitPrice,
            width:element.width
          }
        )
      });
      this.api.AddNewFactor(this.dto).subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: '  تایید',
            text: 'فاکتور شما با موفقیت ثبت و ارسال گردیده شد .'
          });
          this.rout.navigate(['/Invoicelist']);
        },
        error=>
        Swal.fire({
          icon: 'error',
          title: ' عدم تایید',
          text: 'درفرایند ثبت پیش فاکتور مشکلی پیش آمده . لطفاً مجددا تلاش نمایید.'
        })
      );
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire({
        icon: 'info',
        title: ' لغو دستور',
        text: 'دستور ارسال پیش فاکتور لغو گردیدو لطفا اصلاحات خود را انجام داده و مجددا تلاش نمایید.'
      });
    }
  });
}
UpdateFactor(){
  Swal.fire({
    icon: 'question',
    title: 'تاییدیه فاکتور',
    text: 'آیا از اصلاح  فاکتور مورد نظر اطمینان دارید ؟',
    showCancelButton: true,
    confirmButtonText: 'تایید',
    cancelButtonText: 'انصراف',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.rowFactor.forEach(element => {
        this.dto.rows.push(
          {
            length:element.length,
            productAndService_ID:element.productAndService_ID,
            rowDiscription:element.rowDiscription,
            unit:element.unit,
            unitPrice:element.unitPrice,
            width:element.width
          }
        )
      });
      this.api.UpdateFactor(this.factorid,this.dto).subscribe(
        res=>{
          Swal.fire({
            icon: 'success',
            title: '  تایید',
            text: 'فاکتور شما با موفقیت اصلاح و ارسال گردیده شد .'
          });
          this.rout.navigate(['/Invoicelist']);
        },
        error=>
        Swal.fire({
          icon: 'error',
          title: ' عدم تایید',
          text: 'درفرایند ثبت پیش فاکتور مشکلی پیش آمده . لطفاً مجددا تلاش نمایید.'
        })
      );
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire({
        icon: 'info',
        title: ' لغو دستور',
        text: 'دستور ارسال اصلاح فاکتور لغو گردیدو لطفا اصلاحات خود را انجام داده و مجددا تلاش نمایید.'
      });
    }
  });
}
CalculatFactor(){
  let Price = 0 ;
  let Discunt = 0 ;
  let TotalPrice=0;
  this.rowFactor.forEach(element => {
    Price+=element.rowprice;
  });
  Discunt=Price * (this.userDiscunt/100);
  TotalPrice = Price - Discunt;
  this.FactorPrice=Price;
  this.FactorDiscunt=Discunt;
  this.FactorTotalPrice=TotalPrice;
}
deleteCar(car: RowsProduct) {
  Swal.fire({
    icon: 'question',
    title: 'حذف ردیف',
    text: 'آیا از حذف ردیف انتخاب شده اطمینان دارید ؟',
    showCancelButton: true,
    confirmButtonText: 'تایید',
    cancelButtonText: 'انصراف',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      let index = -1;
      for (let i = 0; i < this.rowFactor.length; i++) {
          if (this.rowFactor[i].productAndService_ID == car.productAndService_ID) {
              index = i;
              break;
          }
      }
      this.rowFactor.splice(index, 1);
  
      this.CalculatFactor(); 
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
     
    }
  });
    
}
  openDialog(): void {
    const dialogRef = this.dialog.open(ProdoctListModalComponent, {
      width: 'Auto',
      data: {name: this.productlistinserver, animal: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result!=null){
        this.rowFactor.push(
          {
            productAndService_ID:result.productAndService_ID,
            length:result.length,
            rowDiscription:result.rowDiscription,
            unit:result.unit,
            unitPrice:result.unitPrice,
            width:result.width,
            producName:result.ProductName,
            rowcalculate:result.rowcalculate,
            rowprice:result.rowprice
          }
        );
        
       this.CalculatFactor(); 
      }else if(result==null){
        console.log('بدون انتخاب محصول');
      }
      
    });
  }
  doTextareaValueChange(ev){
    try {
      this.dto.discription = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
}
export interface RowsProduct {
  productAndService_ID:number,
      width:number,
      length:number,
      unit:number,
      unitPrice:number,
      rowDiscription:string,
      producName:string,
      rowcalculate:number,
      rowprice:number
}
export interface RowDtoFactor{
  productAndService_ID: number,
        width: number,
        length: number,
        unit: number,
        unitPrice: number,
        rowDiscription: string
}