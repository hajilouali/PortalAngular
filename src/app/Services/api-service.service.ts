import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { error } from 'protractor';
export enum FactorType {
  PishFactor,
  Factor,
  PendingToAccept
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseurl: '${this.appConfig.apiEndpoint}';
  constructor(private http: HttpClient , private router: Router,@Inject(APP_CONFIG) private appConfig: IAppConfig) { }
  public login(credentials) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', credentials.username);
    body = body.set('password', credentials.password);
    body = body.set('grant_type', 'password');
    this.http.post(`${this.appConfig.apiEndpoint}api/v1/Users/Token`, body, {headers: myheader} ).subscribe(
      res => this.authenticate(res),
      error => {
        Swal.fire({
          title: 'خطا!',
          text: 'کاربری با اطلاعات وارد شده یافت نشد',
          icon: 'error',
          confirmButtonText: 'تایید'
        }); });
  }
  public userinformation() {
   return this.http.get<UserBioInterFace>(`${this.appConfig.apiEndpoint}api/v1/Partner/GetCurentUserInformation`);
  }
  public authenticate(res) {

    localStorage.setItem('token', res.access_token);

    this.router.navigate(['/Dashboard']);
  }
  public logout() {
    localStorage.removeItem('token');
  }
  public isAuthenticated() {

 return this.http.get<UserBio>(`${this.appConfig.apiEndpoint}api/v1/Users/GetCorentUserBio`);
  }
  public GetUserFactorList(GetFactorDto) {
    return this.http.post<FactorList>(`${this.appConfig.apiEndpoint}api/v1/Partner/GetFactorList`, GetFactorDto);
  }
  public GetFactorDto(id) {
    return this.http.get<FactorDto>(`${this.appConfig.apiEndpoint}api/v1/Partner/GetFactor/${id}`);
  }
  public GetFactorAttachment(id):Observable<Factorattachment>{
    return this.http.get<Factorattachment>(`${this.appConfig.apiEndpoint}api/v1/Partner/GetFactorAttachment/${id}`);
  }
  public DeleteAttachment(id){
    return this.http.get(`${this.appConfig.apiEndpoint}api/v1/Partner/DeleteFactorAttachment/${id}`);
  }
  public AddAttachment(id,Model){
    return this.http.post(`${this.appConfig.apiEndpoint}api/v1/Partner/AddAttacmentToFactor/${id}`,Model,{
      reportProgress:true,
      observe:'events',

    });
  }
  public AddDiscriptionAttachment(model){
    return this.http.post(`${this.appConfig.apiEndpoint}api/v1/Partner/AddAttacmentDiscription/${model.id}`,model);
  }
  public GetProductList(){
    return this.http.get<ProducList>(`${this.appConfig.apiEndpoint}api/v1/Partner/GetProducts`);
  }
  public AddNewFactor(dto){
    return this.http.post(`${this.appConfig.apiEndpoint}api/v1/Partner/AddNewFactor`,dto);
  }
  public UpdateFactor(Factorid,dto){
    return this.http.post(`${this.appConfig.apiEndpoint}api/v1/Partner/UpdateFactor/${Factorid}`,dto);
  }
  public ClientMoein(dto){
    return this.http.post<MoeinDto>(`${this.appConfig.apiEndpoint}api/v1/Partner/AccountingHeadingMoein`,dto);
  }
  public TokenisTrue(){

   return this.http.get<baseDto>(`${this.appConfig.apiEndpoint}api/v1/Users/CheckTokenIsValid`);

  }
  public ChangePassword(dto) {
    return this.http.post(`${this.appConfig.apiEndpoint}api/v1/Partner/ChangePassword`, dto);
  }
}
export interface Factorattachment{
  message :string,
  statusCode:number,
  isSuccess:boolean,
  data:[{
    facor_ID:number,
    fileName:string,
    discription:string,
    factor:string,
    id:number
  }]
}
export interface ProducList{
  message :string,
  statusCode:number,
  isSuccess:boolean,
  data:[{
    unitPrice:number,
    unitType:UnitType,
    productCode:string,
    productName:string,
    id:number,
    productType:ProductType,
    unitTypestring:string,
    unitPricestring:string
  }]
}
export enum UnitType
{

    SquareMeters,
    Metr,
    Unit,

}
export enum ProductType
    {
        Product,
        Service
    }
export interface UserBio{

  data:{
    id:number,
    userName:number,
    fullName:string,
    email:string,
    isActive:boolean,
    discount:number,
    userAddress:string,
    userPhone:string,
    rollName:string[]
  },
  isSuccess:boolean,
  statusCode:number,
  message:string
}
export interface FactorDto{
  data:{
    dateTime: string,
    totalPrice: number,
    taxes: number,
    discount: number,
    factorPrice: number,
    user_ID: number,
    client_ID: number,
    factorCodeView: string,
    discription: string,
    factorType: FactorType,
    product_Factor: [
      {
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
        metraj: string
      }
    ],
    manufacture: [
      {
        factor_ID: number,
        inDateTime: string,
        conditionManufacture: ConditionManufacture,
        manufactureHistories: [
          {
            user_ID: number,
            manufacture_ID: number,
            dateTime: string,
            conditionManufacture: ConditionManufacture,
            discription: string,
            id: number,
            userFullname: string,
            conditionManufactureTitle: string
          }
        ],
        id: number,
        factorClientID: number,
        factorClientName: string,
        factorClientaddress: string,
        factorClientPhone: string,
        clientAccountingStatus: {
          status: string,
          price: number
        },
        conditionManufactureTitle: string
      }
    ],
    id: number,
    dateTimevalu: Date,
    user_Name: string,
    userName: string,
    clientAddress: string,
    clientPhone: string,
    clientMeli: string,
    clientEgtesadi: string
    },
  message :string,
  statusCode:number,
  isSuccess:boolean,
}
export enum ConditionManufacture
    {
        PendingForConstruction,
        Cut,
        Built,
        DeliverToClient,
        DeliverToPartner,
        Install

    }
export interface FactorList{
  data:[{
    dateTime: string,
    totalPrice: number,
    taxes: number,
    discount: number,
    factorPrice: number,
    user_ID: number,
    client_ID: number,
    factorCodeView: string,
    discription: string,
    factorType: FactorType,
    product_Factor: [
      {
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
        metraj: string
      }
    ],
    manufacture: [
      {
        factor_ID: number,
        inDateTime: string,
        conditionManufacture: ConditionManufacture,
        manufactureHistories: [
          {
            user_ID: number,
            manufacture_ID: number,
            dateTime: string,
            conditionManufacture: ConditionManufacture,
            discription: string,
            id: number,
            userFullname: string,
            conditionManufactureTitle: string
          }
        ],
        id: number,
        factorClientID: number,
        factorClientName: string,
        factorClientaddress: string,
        factorClientPhone: string,
        clientAccountingStatus: {
          status: string,
          price: number
        },
        conditionManufactureTitle: string
      }
    ],
    id: number,
    dateTimevalu: Date,
    user_Name: string,
    userName: string,
    clientAddress: string,
    clientPhone: string,
    clientMeli: string,
    clientEgtesadi: string
    }],
  message :string,
  statusCode:number,
  isSuccess:boolean,
}
export interface MoeinDto{
  data: [
    {
      accountingHeading_ID: number,
      sanadHeading_ID: number,
      bedehkari: number,
      bestankari: number,
      comment: string,
      accountingHeading: string,
      id: number,
      stringDatatime: string
    }
  ],
  isSuccess: true,
  statusCode: boolean,
  message: string
}
export interface baseDto{
  data:boolean,
  isSuccess: true,
  statusCode: boolean,
  message: string
}
export interface UserBioInterFace{
  data: [
    {
      userID: number,
      userName: string,
      userFullName: string,
      clientAccountingStatus: {
        status: string,
        price: number
      },
      partnerFactorCunt: {
        inyear: number,
        inMonth: number,
        all: number
      },
      manufactureDto: [
        {
          factor_ID: number,
          inDateTime: string,
          conditionManufacture: number
          manufactureHistories: [
            {
              user_ID: number,
              manufacture_ID: number,
              dateTime: string,
              conditionManufacture: number,
              discription: string,
              id: number,
              userFullname: string,
              conditionManufactureTitle: string
            }
          ],
          id: number,
          factorClientID: number,
          factorClientName: string,
          factorClientaddress: string,
          factorClientPhone: string,
          clientAccountingStatus: {
            status: string,
            price: number
          },
          conditionManufactureTitle: string
        }
      ],
      factorPernding: [
        {
          dateTime: string,
          totalPrice: number,
          taxes: number,
          discount: number,
          factorPrice: number,
          user_ID: number,
          client_ID: number,
          factorCodeView: string,
          discription: string,
          factorType: number,
          product_Factor: [
            {
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
              metraj: string
            }
          ],
          manufacture: [
            {
              factor_ID: number,
              inDateTime: string,
              conditionManufacture: number,
              manufactureHistories: [
                {
                  user_ID: number,
                  manufacture_ID: number,
                  dateTime: string,
                  conditionManufacture: number,
                  discription: string,
                  id: number,
                  userFullname: string,
                  conditionManufactureTitle: string
                }
              ],
              id: number,
              factorClientID: number,
              factorClientName: string,
              factorClientaddress: string,
              factorClientPhone: string,
              clientAccountingStatus: {
                status: string,
                price: number
              },
              conditionManufactureTitle: string
            }
          ],
          id: number,
          dateTimevalu: Date,
          user_Name: string,
          userName: string,
          clientAddress: string,
          clientPhone: string,
          clientMeli: string,
          clientEgtesadi: string
        }
      ]
    }
  ] ,
  isSuccess: true ,
  statusCode: boolean ,
  message: string
}
