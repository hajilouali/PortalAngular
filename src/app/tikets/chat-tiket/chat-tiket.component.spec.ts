import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTiketComponent } from './chat-tiket.component';

describe('ChatTiketComponent', () => {
  let component: ChatTiketComponent;
  let fixture: ComponentFixture<ChatTiketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTiketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTiketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
