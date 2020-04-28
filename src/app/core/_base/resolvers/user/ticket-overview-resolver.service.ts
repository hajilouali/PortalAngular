import { TiketServicesService, Ticket } from './../../../../tikets/Services/tiket-services.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TicketOverviewResolver implements Resolve<Ticket> {
    id;
    constructor(private ticketService: TiketServicesService, private router: Router,
                private alertService: ToastrService, private route: ActivatedRoute) {
                  this.route.queryParamMap.subscribe(res => this.id = res.get('id'));
                }

    resolve(route: ActivatedRouteSnapshot): Observable<Ticket> {
        let tiketid = null;
        // tiketid = this.route.snapshot.parent.queryParams['id'];
        this.route.queryParamMap.subscribe(res => {tiketid = res.get('id');});
        console.log(`id is :${tiketid}`);
        return this.ticketService.getTicket(tiketid).pipe(
            catchError(error => {
                this.alertService.error(error, 'خطا');
                return of(null);
            })
        );
    }
}
