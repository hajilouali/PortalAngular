import { Component, OnInit, Input } from '@angular/core';
import { TicketContent } from '../Services/tiket-services.service';

@Component({
  selector: 'app-chat-message-ticket',
  templateUrl: './chat-message-ticket.component.html',
  styleUrls: ['./chat-message-ticket.component.css']
})
export class ChatMessageTicketComponent implements OnInit {
  @Input() ticketContent: TicketContent;
  constructor() { }

  ngOnInit(): void {
    console.log(this.ticketContent);
  }

}
