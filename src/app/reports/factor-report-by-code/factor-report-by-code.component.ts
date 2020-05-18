import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { ActivatedRoute } from '@angular/router';
declare var Stimulsoft: any;
@Component({
  selector: 'app-factor-report-by-code',
  templateUrl: './factor-report-by-code.component.html',
  styleUrls: ['./factor-report-by-code.component.css']
})
export class FactorReportByCodeComponent implements OnInit {
  id;
  object123 = [];
  respons;
  options: any = new Stimulsoft.Viewer.StiViewerOptions();
	viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
  constructor(private api: ApiServiceService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(res => this.id = res.get('id'));
  }

  ngOnInit(): void {
    let row = 1 ;
    this.api.GetFactorDtoByCode(this.id).subscribe(
      res => { this.respons = res; console.log(this.object123);
               this.respons.data.product_Factor.forEach(element => {
               this.object123.push({
                FactorType:this.respons.data.factorType == 0?'پیش فاکتور':this.respons.data.factorType==1?'فاکتور':this.respons.data.factorType==2?'در انتظار تایید':'',
                FactorID: this.respons.data.id,
                DateTime: this.respons.data.dateTime,
                Discription: this.respons.data.discription,
                FactorPrice: this.respons.data.factorPrice,
                TotalRice: this.respons.data.totalPrice,
                Taxe: this.respons.data.taxes,
                ClientName: this.respons.data.user_Name,
                ClientAddress: this.respons.data.clientAddress,
                ClientPhone: this.respons.data.clientPhone,
                RowNumeber: row,
                RowProductName: element.productAndService,
                RowArz: element.width,
                RowTol: element.length,
                RowUnit: element.unit,
                RowMetraj: element.metraj,
                RowUnitPrice: element.unitPrice,
                RowDiscription: element.rowDiscription,
                RowPrice: element.price,
                ClientMeli: this.respons.data.clientMeli,
                ClientEgtesadi: this.respons.data.clientEgtesadi,
                discount: this.respons.data.discount,
                CodeRahgiri: this.respons.data.factorCodeView
          });

         row = row+1;
        });

      Stimulsoft.Base.StiLicense.key =
       '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT';

               Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("localization/fa.xml", true);



               var report = new Stimulsoft.Report.StiReport();

               report.loadFile("reports/Factor.mrt");

               var dsDT = new Stimulsoft.System.Data.DataSet("DT");
               dsDT.readJson(this.object123);
               report.regData("DT", "DT", dsDT);

               this.viewer.report = report;
               this.viewer.renderHtml("viewerContent");
      },
      error=>console.log('در فرایند دریافت اطلاعات فاکتور مشکلی پیش آمده')
    );


  }

}
