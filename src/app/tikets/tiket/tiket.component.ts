import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TiketServicesService, GetTikets, Ticket } from './../Services/tiket-services.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tiket',
  templateUrl: './tiket.component.html',
  styleUrls: ['./tiket.component.css']
})
export class TiketComponent implements OnInit {
  @Input() ticket: Ticket;
  @Input() ticketId: Ticket;
  @Output() selectedTicketId = new EventEmitter<Ticket>();
  issected: boolean = false;
  constructor(private router: Router, private title: Title) { }

  ngOnInit(): void {
  }
  onClick(ticketId: number) {

    // this.selectedTicketId.emit(ticketId);
    this.selectedTicketId.emit(this.ticket);
    this.issected = !this.issected;
    // this.router.navigate(['Tikets/overview'] , { queryParams: { id: this.ticketId }});
  }
  ClickA() {
    const chatAppTarget = $('.chat-for-widgets-1.chat-cmplt-wrap');
    // const chatAppTarget = document.getElementsByClassName('.chat-for-widgets-1.chat-cmplt-wrap');
    const width = $(window).width();
	   if (width <= 1007) {
        chatAppTarget.addClass('chat-box-slide');
      }
		 return false;
  }
}
