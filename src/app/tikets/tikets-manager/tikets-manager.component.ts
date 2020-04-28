import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TiketServicesService, GetTikets, Ticket } from './../Services/tiket-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tikets-manager',
  templateUrl: './tikets-manager.component.html',
  styleUrls: ['./tikets-manager.component.css']
})
export class TiketsManagerComponent implements OnInit, OnDestroy  {
  subManager = new Subscription();
  tickets: Ticket[];
  selectedtik: Ticket;
  constructor(private route: ActivatedRoute) { }
  selectedtikmetod(event) {
      this.selectedtik = event;
      console.log(this.selectedtik);

  }
  ngOnInit() {
    this.loadTickets();
  }
  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
  loadTickets() {

    this.subManager.add(
      this.route.data.subscribe(data => {
          this.tickets = data.tickets.data;
      })
    );

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
  GoBack() {
    const chatAppTarget = $('.chat-for-widgets-1.chat-cmplt-wrap');
    const width = $(window).width();
		  if (width <= 1007) {
			chatAppTarget.removeClass('chat-box-slide');
		}
		  return false;
  }
}
