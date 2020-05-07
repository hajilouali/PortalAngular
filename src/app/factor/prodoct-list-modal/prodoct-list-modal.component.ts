import { JalaliPipe } from './../../Services/jalali-pipe.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../add-factor/add-factor.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Interface } from 'readline';
import Swal from 'sweetalert2';
import { UnitType, ProductType } from 'src/app/Services/api-service.service';
@Component({
  selector: 'app-prodoct-list-modal',
  templateUrl: './prodoct-list-modal.component.html',
  styleUrls: ['./prodoct-list-modal.component.css']
})
export class ProdoctListModalComponent implements OnInit {
  cars: Car[];
  ordingdata:Car[];
    cols: any[];
    selectedCar4:Car;
    first = 0;
    rows = 10;
    ShowSelectProduct = true;
    ShowCalculatProduct=false;
    Toll=true;
    arz=true;
    postData={
      productAndService_ID:0,
      ProductName:'',
      width:0,
      length:0,
      unit:0,
      unitPrice:0,
      rowDiscription:'',
      rowcalculate:0,
      rowprice:0
      }



  constructor(
    public dialogRef: MatDialogRef<ProdoctListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

    this.cars=this.data.name;
    this.ordingdata=this.data.name;
    this.cols = [

      { field: 'productName', header: 'نام محصول' },
      { field: 'productCode', header: 'کد محصول'},
      { field: 'unitPricestring', header: 'قیمت واحد' },
      { field: 'unitTypestring', header: 'واحد' }
      ];
      // const item = document.getElementById('SelectProduct');
      // item.hidden=true;
      // const nextItem=document.getElementById('CalculatProduct');
      // nextItem.hidden=false;
  }
  doTextareaValueChange(ev){
    try {
      this.postData.rowDiscription = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
  ClickNextCalculat(){
    if(this.selectedCar4==null){
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'لطفاً یک محصول برای اضافه کردن به فاکتور و ادامه دستورات انتخاب نمایید',
      });
    }else if(this.selectedCar4!=null){
      this.postData.productAndService_ID=this.selectedCar4.id;
      this.postData.unitPrice=this.selectedCar4.unitPrice;
      this.postData.ProductName=this.selectedCar4.productName;
      this.ShowSelectProduct=false;
      this.ShowCalculatProduct=true;
      switch (this.selectedCar4.unitType) {
        case 0 :
          this.Toll=true;
          this.arz=true;
          break;
        case 1 :
            this.Toll=true;
            this.arz=false;
        break;
        case 2:
          this.Toll=false;
          this.arz=false;
        break;
      }
    }

  }
  roundNumberV2(num, scale) {
    if (Math.round(num) != num) {
      if (Math.pow(0.1, scale) > num) {
        return 0;
      }
      var sign = Math.sign(num);
      var arr = ("" + Math.abs(num)).split(".");
      if (arr.length > 1) {
        if (arr[1].length > scale) {
          var integ = +arr[0] * Math.pow(10, scale);
          var dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
          var proc = +arr[1].slice(scale, scale + 1)
          if (proc >= 5) {
            dec = dec + 1;
          }
          dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
          return dec;
        }
      }
    }
    return num;
  }
  ChangeValue(){
    switch (this.selectedCar4.unitType) {
      case 0:
        this.postData.rowcalculate=this.roundNumberV2((this.postData.width*this.postData.length*this.postData.unit),3);
        this.postData.rowprice=this.postData.rowcalculate*this.postData.unitPrice;
        break;
      case 1:
        this.postData.rowcalculate=this.roundNumberV2((this.postData.length*this.postData.unit),3);
        this.postData.rowprice=this.postData.rowcalculate*this.postData.unitPrice;
        break;
      case 2:
        this.postData.rowcalculate=this.roundNumberV2((this.postData.unit),3);
        this.postData.rowprice=this.postData.rowcalculate*this.postData.unitPrice;
        break;

    }
  }
  ClickPrive(){
    this.ShowSelectProduct = true;
    this.ShowCalculatProduct=false;
    this.postData.length=0;
    this.postData.width=0;
    this.postData.rowcalculate=0;
    this.postData.rowprice=0;
    this.postData.unit=0;
  }
  Finish(){

    this.data.animal=this.postData;

    this.dialogRef.close(this.postData);
  }
  onNoClick(): void {
    this.dialogRef.close(null);
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
    return this.first === (this.cars.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
  filter(text){
  this.cars=this.filterItems(this.ordingdata,text);

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
export interface Car{
  unitPrice:number,
  unitType:UnitType,
  productCode:string,
  productName:string,
  id:number,
  productType:ProductType,
  unitPricestring:string,
  unitTypestring:string
}
export interface ProductRow {
  productAndService_ID:number,
      width:number,
      length:number,
      unit:number,
      unitPrice:number,
      rowDiscription:string,
      rowcalculate:number,
      rowprice:number
}
