import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form ;
  constructor(private auth: ApiServiceService , private fb: FormBuilder) {
    this.form = fb.group({
      username : ['', Validators.required],
      password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }
  register(respons) {
    const log = {username: respons.username, password: respons.password, grant_type: 'password'};
    this.auth.login(log);
   }
}
