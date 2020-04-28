import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { IAppConfig, APP_CONFIG } from '../../app.config';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class TiketServicesService {
  baseurl;
  constructor(private http: HttpClient , private router: Router, @Inject(APP_CONFIG) private appConfig: IAppConfig) {
    this.baseurl = `${this.appConfig.apiEndpoint}`;
  }
  public GetAllTiket(page) {
    return this.http.get<GetTikets>(`${this.appConfig.apiEndpoint}api/v1/Tiket/GetTiketList/${page}`);
   }
   getTicket(ticketId: number): Observable<Tiketrespons> {
    return this.http.get<Tiketrespons>(`${this.appConfig.apiEndpoint}api/v1/Tiket/GetTiket/${ticketId}`);
  }
  // public addTicket(dto) {
  //   return this.http.post<addTicketInterface>(`${this.appConfig.apiEndpoint}api/v1/Tiket/GetTiketList`, dto);
  //  }
   public addTicket(ticket: any): Observable<Tiketrespons> {
    return this.http.post<Tiketrespons>(`${this.appConfig.apiEndpoint}api/v1/Tiket/AddTiket`, ticket);
  }
  public addTicketContent(ticketContent: any, id: number): Observable<TiketContentrespons> {
    return this.http.post<TiketContentrespons>(`${this.appConfig.apiEndpoint}api/v1/Tiket/AddTiketContent/${id}` , ticketContent);
  }

  // public setTicketClosed(closed: any, id: number) {
  //   return this.http.put(`${this.appConfig.apiEndpoint}api/v1/Tiket/GetTiketList` + id , {closed});
  // }
}
export interface TiketContentrespons{
  isSuccess: boolean ;
  statusCode: number;
  message: string;
  data: TicketContent ;
}
export interface Tiketrespons {
  isSuccess: boolean ;
  statusCode: number;
  message: string;
  data: Ticket ;
}
export interface GetTikets {
  isSuccess: boolean ;
  statusCode: number;
  message: string;
  data: Ticket [];
}
export interface Ticket {
  title: string;
  closed: boolean;
  level: number;
  department: number;
  isAdminSide: boolean;
  userID: number;
  dataCreate: Date;
  dataModified: Date;
  user: string ;

  id: number;
  tiketContents: TicketContent[];
}
export interface TicketContent {
  id: Number;
  tiketId: Number;
  dataModified: Date;
  dataCreate: Date;
  text: string;
  fileURL: string;
  isAdminSide: boolean;
}
