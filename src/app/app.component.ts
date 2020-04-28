import { ApiServiceService } from './Services/api-service.service';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient , private router: Router, private auth: ApiServiceService) {

  }

  classdynamic = true;
  ngclasss ;
  title = 'Portal';
  ngOnInit(): void {


  }
}
