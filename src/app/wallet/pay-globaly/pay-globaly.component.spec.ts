import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGlobalyComponent } from './pay-globaly.component';

describe('PayGlobalyComponent', () => {
  let component: PayGlobalyComponent;
  let fixture: ComponentFixture<PayGlobalyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGlobalyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGlobalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
