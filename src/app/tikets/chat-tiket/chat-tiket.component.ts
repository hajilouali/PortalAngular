import { Component, OnInit, Input } from '@angular/core';
import { TicketContent } from '../Services/tiket-services.service';

@Component({
  selector: 'app-chat-tiket',
  templateUrl: './chat-tiket.component.html',
  styleUrls: ['./chat-tiket.component.css']
})
export class ChatTiketComponent implements OnInit {
  @Input() ticketContents: TicketContent[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.ticketContents);
  }

}
