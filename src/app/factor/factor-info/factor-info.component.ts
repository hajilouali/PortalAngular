import { error } from 'protractor';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factor-info',
  templateUrl: './factor-info.component.html',
  styleUrls: ['./factor-info.component.css']
})
export class FactorInfoComponent implements OnInit {
  Factoridid;
  dto;

  constructor(private route: ActivatedRoute, private api: ApiServiceService) {
    this.route.queryParamMap.subscribe(res => {this.Factoridid = res.get('id'); });
  }

  ngOnInit(): void {
    this.api.GetFactorDtoByCode(this.Factoridid).subscribe(res =>
      {
        this.dto = res.data;
        if (!res.data) {
          Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'فاکتوری با کد رهگیری ارسالی یافت نشد.',
          })
        }
        console.log(res.data);
      },
      error => Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'فاکتوری با کد رهگیری ارسالی یافت نشد.',
      }));
  }

}
