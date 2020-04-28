import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router , CanActivate} from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { ApiServiceService } from './api-service.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
result: boolean=false;

  constructor(private Api:ApiServiceService,private router: Router, private http: HttpClient,@Inject(APP_CONFIG) private appConfig: IAppConfig) { }
  canActivate() {
    var token = localStorage.getItem("token");
    
    
    

    if (token!=null){
      return true;
      
      
    }
    else{
      this.router.navigate(["login"]);
      return false;
    }
    


    
  }
}
