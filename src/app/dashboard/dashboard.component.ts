import { ApiServiceService } from '../Services/api-service.service';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router, Data } from '@angular/router';
import { error } from 'protractor';
import {  Subscription } from 'rxjs';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {
  userinfo;
  datenow = new Date();
  subManager = new Subscription();
  constructor(private auth: ApiServiceService, private router: Router) {

  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  ngOnInit(): void {
    this.subManager.add(
      this.auth.userinformation().subscribe( p => {
        this.userinfo = p.data;
        console.log(p.data);
      },
      error => this.logout())

    )

  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
