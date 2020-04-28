import { ApiServiceService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  ticketForm: FormGroup = this.formBuilder.group({
    oldpassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(7)]],
    newpassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(7)]]});
  constructor(private formBuilder: FormBuilder, private Api: ApiServiceService,private alertService: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.ticketForm.valid) {
      const ticket = new FormData();
      ticket.append('OldPassword', this.ticketForm.get('oldpassword').value);
      ticket.append('NewPassword', this.ticketForm.get('newpassword').value);
      this.Api.ChangePassword(ticket).subscribe((data) => {
        this.ticketForm.reset();
        this.alertService.success('رمز عبور شما با موفقیت تغییر یافت .');
      }, error => {
        this.alertService.error(error, 'خطا در تغییر رمز عبور');

      });
    } else {
      this.alertService.warning('اطلاعات وارد شده را به درستی وارد کنید', 'خطا');
    }
  }
}
