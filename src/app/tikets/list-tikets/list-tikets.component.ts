import { CreateFormTicketComponent } from './../create-form-ticket/create-form-ticket.component';
import { TiketServicesService, GetTikets, Ticket } from './../Services/tiket-services.service';
import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-tikets',
  templateUrl: './list-tikets.component.html',
  styleUrls: ['./list-tikets.component.css']
})
export class ListTiketsComponent implements OnInit, OnDestroy{
  @Input() firstTickets;
  // firstTickets = 1;
  @ViewChild(NgScrollbar, {static: false}) ticketScrollbar: NgScrollbar;
  tickets = new BehaviorSubject<Ticket[]>([]);
  page = 2;
  finished = false;
  subManager = new Subscription();
  promiseSetBySomeAction: any;
  selectedTicketId: Ticket;
  @Output() public childData = new EventEmitter();
  constructor(private apiservice: TiketServicesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tickets.next(this.firstTickets);
    // this.gettiket(this.firstTickets);
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(CreateFormTicketComponent, dialogConfig);
    const sub = dialogRef.componentInstance.newTicket.subscribe((data) => {
        this.addTicket(data);
     });
    dialogRef.afterClosed().subscribe(() => {
       sub.unsubscribe();
     });

  }
  addTicket(ticket: Ticket) {
    const currentTickets = this.tickets.getValue();
    this.tickets.next([ticket].concat(currentTickets));
  }
  changeSelectedTicketId(event) {
    this.selectedTicketId = event;
    this.childData.emit(event);
  }
  onScroll() {
    this.gettiket(this.page);
  }
  gettiket(pageCout: number) {
    this.promiseSetBySomeAction = new Promise((resolve, reject) => {
      if (this.finished) {
        return;
      }
      const currentTickets = this.tickets.getValue();
      this.subManager.add(

        this.apiservice.GetAllTiket( pageCout).subscribe((newTickets) => {
          if (newTickets.data.length === 0) {
            this.finished = true;
            return;
          }

          this.tickets.next(_.concat(currentTickets, newTickets.data));
          // this.ticketScrollbar.update();
          this.page = this.page + 1;
        })
      );
    });
  }
}
