import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import * as moment from 'jalali-moment';
import { trigger,state,style,transition,animate } from '@angular/animations';

declare var Stimulsoft: any;
@Component({
  selector: 'app-moein-client',
  templateUrl: './moein-client.component.html',
  styleUrls: ['./moein-client.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class MoeinClientComponent implements OnInit {
  respons;
  options: any = new Stimulsoft.Viewer.StiViewerOptions();
  object123=[];
  ClientInfo;

  startDate=moment(Date.now()).jDate(1);
  endDate=moment(Date.now());
	viewer: any = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
  constructor(private http: HttpClientModule,private api :ApiServiceService) {

   }

  ngOnInit(): void {
    this.Filter();

   }
  Filter(){
    let dto = {
      startDate:this.startDate.format('jYYYY/jMM/jDD').toString(),
      endDate:this.endDate.format('jYYYY/jMM/jDD').toString(),
      clientID:0,
    }
    this.object123=[];
    this.api.isAuthenticated().subscribe(
      ress => {
        this.ClientInfo = (<any>ress).data;
        this.api.ClientMoein(dto).subscribe(res => {
          this.respons = res;
          let indesx = 1;
          res.data.forEach(element => {
                    this.object123.push({
                    ClientName: this.ClientInfo.fullName,
                    ClientID: 0,
                    ClientAddress:  this.ClientInfo.userAddress,
                    ClientPhone:  this.ClientInfo.userPhone,
                    tbRow:  indesx,
                    tbSanadID:  element.sanadHeading_ID,
                    tbDate: element.stringDatatime,
                    tbDiscription:  element.comment,
                    tbBedehkar: element.bedehkari,
                    tbBestankar:  element.bestankari,
                    ReportDate: moment(Date.now()).format('jYYYY/jM/jD')});
                    indesx++;
                     });
          Stimulsoft.Base.StiLicense.key ="6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT";
          Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile('localization/fa.xml', true);
          const report = new Stimulsoft.Report.StiReport();
          report.loadFile('reports/MoeinClient.mrt');
          const dsDT = new Stimulsoft.System.Data.DataSet('DT');
          dsDT.readJson(this.object123);
          report.regData('DT', 'DT', dsDT);
          this.viewer.report = report;
          this.viewer.renderHtml('viewerContent');
          },
          error => console.log('در فرایند دریافت اطلاعات فاکتور مشکلی پیش آمده')
              );
      }
    )





  }
}
