import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageTicketComponent } from './chat-message-ticket.component';

describe('ChatMessageTicketComponent', () => {
  let component: ChatMessageTicketComponent;
  let fixture: ComponentFixture<ChatMessageTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
