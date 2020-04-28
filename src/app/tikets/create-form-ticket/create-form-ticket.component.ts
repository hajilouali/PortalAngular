import { TiketServicesService , Ticket} from './../Services/tiket-services.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-create-form-ticket',
  templateUrl: './create-form-ticket.component.html',
  styleUrls: ['./create-form-ticket.component.css'],
  providers: [MessageService]
})
export class CreateFormTicketComponent implements OnInit {
  @Output() newTicket = new EventEmitter<Ticket>();
  slectedFile: File = null;
  selected = false;
  fileName = '';
  ticketForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    department: ['', [Validators.required]],
    level: [''],
    text: ['', [Validators.required, Validators.maxLength(1000)]]
  });
  constructor(private formBuilder: FormBuilder, private matdialogRef: MatDialogRef<CreateFormTicketComponent>,
              private ticketService: TiketServicesService,
              private alertService: ToastrService) { }

  ngOnInit(): void {
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
    this.ticketForm.reset();
    this.matdialogRef.close();
    this.slectedFile = null;
  }
  onSubmitCreate() {
    if (this.ticketForm.valid) {
      const ticket = new FormData();
      // document = Object.assign({}, this.docLeftForm.value);
      if (this.slectedFile !== null) {
        ticket.append('file', this.slectedFile, this.slectedFile.name);
      }
      ticket.append('title', this.ticketForm.get('title').value);
      ticket.append('department', this.ticketForm.get('department').value);
      ticket.append('level', this.ticketForm.get('level').value);
      ticket.append('text', this.ticketForm.get('text').value);
      this.ticketService.addTicket(ticket).subscribe((data) => {
        this.alertService.success('تیکتی شما با موفقیت ثبت شد', 'موفق');
        this.onClear();
        this.newTicket.emit(data.data);
      }, error => {
        this.alertService.error(error, 'خطا در ثبت تیکت جدید');

      });
    } else {
      this.alertService.warning('اطلاعات تیکت را به درستی وارد کنید', 'خطا');
    }
  }
}
