import { error } from 'protractor';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  userinfo;
  FullName='';
  @Input('parentdata') public ClassBy:boolean;
  @Output() public childData = new EventEmitter();

  constructor(private auth: ApiServiceService, private router: Router) {



   }

  ngOnInit(): void {
    this.auth.userinformation().subscribe( res => {
       this.userinfo = res;

       this.userinfo = this.userinfo.data;
       this.FullName = this.userinfo.userFullName;
        },
        error => this.logout());


  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  togglenavbtnClick() {
    this.ClassBy = !this.ClassBy;
    switch (this.ClassBy) {
case true: {
  this.childData.emit('wrapper theme-1-active');
  break;
}
case false: {
  this.childData.emit('wrapper theme-1-active slide-nav-toggle');
  break;
}
}


  }
}
