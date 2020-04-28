import { error } from 'protractor';
import { TiketServicesService, Ticket, TicketContent } from './../Services/tiket-services.service';
import { Component, OnInit, OnDestroy, Input, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import * as moment from 'jalali-moment';
import { APP_CONFIG, IAppConfig } from 'src/app/app.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ditail-tiket',
  templateUrl: './ditail-tiket.component.html',
  styleUrls: ['./ditail-tiket.component.css']
})
export class DitailTiketComponent implements OnInit, OnDestroy{
  @ViewChild('closedchk', {static: false}) private closedck;
  // @Input() selectedtiket;
  @Input() ticket: Ticket ;
  baseurl;
  splash = '/';
  slectedFile: File = null;
  selected = false;
  fileName = '';
  ticketContentForm: FormGroup = this.formBuilder.group({
    text: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  subManager = new Subscription();
  constructor(private formBuilder: FormBuilder,@Inject(APP_CONFIG) private appConfig: IAppConfig,private route: ActivatedRoute,  private ticketService: TiketServicesService, private alertService: ToastrService) {
      // this.route.queryParamMap.subscribe(res => this.id = res.get('id'));

    }
    onSubmitCreate() {
      let dateTime = new Date();

      if (this.ticketContentForm.valid) {
        const ticketContent = new FormData();
        if (this.slectedFile !== null) {
          ticketContent.append('file', this.slectedFile, this.slectedFile.name);
        }
        ticketContent.append('text', this.ticketContentForm.get('text').value);
        this.ticketService.addTicketContent(
           ticketContent,
           this.ticket.id
           ).subscribe((data) => {
          this.alertService.success('  با موفقیت ارسال شد', 'موفق');
          this.onClear();
          this.ticket.tiketContents.push({
            id: data.data.id,
            dataCreate: data.data.dataCreate,
            dataModified: data.data.dataModified,
            fileURL: data.data.fileURL,
            isAdminSide: data.data.isAdminSide,
            text: data.data.text,
            tiketId: data.data.tiketId
          });
        }, error => {
          this.alertService.error(error, 'خطا در ثبت تیکت جدید');
        });
      } else {
        this.alertService.warning('اطلاعات تیکت را به درستی وارد کنید', 'خطا');
      }
    }

    onFileSelect(file) {
      if (file.target.files[0]) {
        this.slectedFile = file.target.files[0] as File;
        const reader = new FileReader();
        reader.readAsDataURL(this.slectedFile);
        this.selected = true;
        this.fileName = this.slectedFile.name;
      }
    }
    onClear() {
      this.ticketContentForm.reset();
      this.slectedFile = null;
    }
  ngOnInit(): void {
    this.baseurl = `${this.appConfig.apiEndpoint}uploads/Tiket/`;

    this.loadTickets();
    // console.log(this.ticket);
    // this.title.setTitle('مشاهده ی تیکت ' + this.ticket.title);
  }
  ngOnDestroy() {
    // this.subManager.unsubscribe();

   this.loadTickets();
  }
  // onSetClosed() {
  //   this.ticketService.setTicketClosed(
  //     this.closedck.checked ,
  //     this.ticket.id
  //   ).subscribe(() => {
  //     this.alertService.success('وضعیت تیکت با موفیت تغییر کرد', 'موفق');
  //     this.ticket.closed = this.closedck.checked;
  //     if (this.closedck.checked === true) {
  //       // this.store.dispatch(new fromStore.DecUnClosedTicketCount());
  //     } else {
  //       // this.store.dispatch(new fromStore.IncUnClosedTicketCount());
  //     }
  //   }, error => {
  //     this.alertService.error(error, 'خطا در تغییر وضعیت');
  //   });
  // }
  loadTickets() {
    // this.ticket = this.selectedtiket;
    // this.subManager.add(
    //   this.ticketService.getTicket(this.id).subscribe(  res => {
    //       this.ticket.title = res.data.title;
    //       this.ticket.closed = res.data.closed;
    //       this.ticket.dataCreate = res.data.dataCreate;
    //       this.ticket.dataModified = res.data.dataModified;
    //       this.ticket.department = res.data.department;
    //       this.ticket.id = res.data.id;
    //       this.ticket.isAdminSide = res.data.isAdminSide;
    //       this.ticket.level = res.data.level;
    //       this.ticket.ticketContents = res.data.ticketContents;
    //       this.ticket.user = res.data.user;
    //       this.ticket.userID = res.data.userID;


    //     },
    //     err => this.alertService.error(err, 'خطا')
    //   )

    // );
  }
  addToTicketContentList(ticketContent: TicketContent) {
    this.ticket.tiketContents.push(ticketContent);
  }
  gotoAdd() {
    $('html , body').animate({
      scrollTop: $('#btnAddTicketContent').offset().top + 20
    }, 500);
  }





  GoBack() {
    const chatAppTarget = $('.chat-for-widgets-1.chat-cmplt-wrap');
    const width = $(window).width();
		  if (width <= 1007) {
			chatAppTarget.removeClass('chat-box-slide');
		}
		  return false;
  }
}
